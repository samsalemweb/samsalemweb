import { supabase } from './supabase';
import type { PresaleListing, PresaleListingImage, PresaleWithImages } from '@/types/presale';

// ---- helpers ----

function resolveImageUrl(img: PresaleListingImage): string {
    if (img.cloudinary_url && img.cloudinary_url.trim() !== '') {
        return img.cloudinary_url;
    }
    return img.original_livabl_image_url || '';
}

function deriveSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * Map a raw Supabase row (with space/special-char column names) to our TS interface.
 */
function mapRawListing(row: Record<string, unknown>): PresaleListing {
    return {
        listing_name: (row['Listing Name'] as string) || '',
        developer: (row['Developer'] as string) || '',
        city: (row['City'] as string) || '',
        neighbourhood: (row['Neighbourhood'] as string) || '',
        price_range: (row['Price Range'] as string) || '',
        listing_status: (row['Listing Status'] as string) || '',
        build_status: (row['Build Status'] as string) || '',
        move_in: (row['Move-In'] as string) || '',
        beds: (row['Beds'] as string) || '',
        baths: (row['Baths'] as string) || '',
        sq_ft: (row['Sq Ft'] as string) || '',
        strata_fee: (row['Strata Fee'] as string) || '',
        units_avail: (row['Units Avail.'] as string) || '',
        total_units: (row['Total Units'] as string) || '',
        property_type: (row['Property Type'] as string) || '',
        sales_center_address: (row['Sales Center Address'] as string) || '',
        phone: (row['Phone'] as string) || '',
        email: (row['Email'] as string) || '',
        source_url: (row['Source URL'] as string) || '',
    };
}

function mapRawImage(row: Record<string, unknown>): PresaleListingImage {
    return {
        listing_name: (row['Listing Name'] as string) || '',
        slug: (row['Slug'] as string) || '',
        image_number: (row['Image #'] as number) || 0,
        cloudinary_public_id: (row['Cloudinary Public ID'] as string) || '',
        original_livabl_image_url: (row['Original Livabl Image URL'] as string) || '',
        cloudinary_url: (row['Cloudinary URL (fill after upload)'] as string) || '',
    };
}

// ---- public API ----

/**
 * Fetch all presale listings with images joined.
 * Filters out Builder Page entries and N/A price ranges.
 */
export async function getAllPresaleListings(): Promise<PresaleWithImages[]> {
    const [listingsRes, imagesRes] = await Promise.all([
        supabase
            .from('presale_listings')
            .select('"Listing Name", "Developer", "City", "Neighbourhood", "Price Range", "Listing Status", "Build Status", "Move-In", "Beds", "Baths", "Sq Ft", "Strata Fee", "Units Avail.", "Total Units", "Property Type", "Sales Center Address", "Phone", "Email", "Source URL"'),
        supabase
            .from('presale_listing_images')
            .select('"Listing Name", "Slug", "Image #", "Cloudinary Public ID", "Original Livabl Image URL", "Cloudinary URL (fill after upload)"')
            .order('"Image #"', { ascending: true }),
    ]);

    if (listingsRes.error) {
        console.error('Error fetching presale_listings:', listingsRes.error);
        return [];
    }
    if (imagesRes.error) {
        console.error('Error fetching presale_listing_images:', imagesRes.error);
    }

    const rawListings = (listingsRes.data || []) as Record<string, unknown>[];
    const rawImages = (imagesRes.data || []) as Record<string, unknown>[];

    const listings = rawListings.map(mapRawListing);
    const images = rawImages.map(mapRawImage);

    // Group images by listing name
    const imagesByName = new Map<string, PresaleListingImage[]>();
    for (const img of images) {
        const key = img.listing_name;
        if (!imagesByName.has(key)) imagesByName.set(key, []);
        imagesByName.get(key)!.push(img);
    }

    // Build slug map from images table
    const slugByName = new Map<string, string>();
    for (const img of images) {
        if (img.slug && !slugByName.has(img.listing_name)) {
            slugByName.set(img.listing_name, img.slug);
        }
    }

    const results: PresaleWithImages[] = [];

    for (const listing of listings) {
        // Filter out builder pages, N/A entries, and Sold Out listings
        if (listing.property_type === 'Builder Page') continue;
        if (listing.price_range && listing.price_range.includes('N/A')) continue;
        if (listing.listing_status === 'Sold Out') continue;

        // Replace "See source URL" with user-friendly text
        if (listing.price_range && listing.price_range.toLowerCase().includes('see source url')) {
            listing.price_range = 'Pricing Coming Soon';
        }

        const slug = slugByName.get(listing.listing_name) || deriveSlug(listing.listing_name);
        const listingImages = imagesByName.get(listing.listing_name) || [];

        const resolvedImages = listingImages.map((img) => ({
            url: resolveImageUrl(img),
            alt: `${listing.listing_name} - Image ${img.image_number}`,
        })).filter((img) => img.url !== '');

        results.push({
            ...listing,
            slug,
            images: resolvedImages,
            cover_image: resolvedImages.length > 0 ? resolvedImages[0].url : null,
        });
    }

    return results;
}

/**
 * Fetch a single presale listing by slug.
 */
export async function getPresaleBySlug(slug: string): Promise<PresaleWithImages | null> {
    // Find the listing name from the images table by slug
    const { data: imgRows, error: imgError } = await supabase
        .from('presale_listing_images')
        .select('"Listing Name", "Slug", "Image #", "Cloudinary Public ID", "Original Livabl Image URL", "Cloudinary URL (fill after upload)"')
        .eq('Slug', slug)
        .order('"Image #"', { ascending: true });

    if (imgError) {
        console.error('Error fetching images by slug:', imgError);
    }

    const rawImgRows = (imgRows || []) as Record<string, unknown>[];
    const images = rawImgRows.map(mapRawImage);

    const listingName = images.length > 0 ? images[0].listing_name : null;

    // If no images matched, try to find by derived slug
    if (!listingName) {
        const allListings = await getAllPresaleListings();
        const match = allListings.find((l) => l.slug === slug);
        return match || null;
    }

    // Fetch the listing row
    const { data: listingRows, error: listingError } = await supabase
        .from('presale_listings')
        .select('"Listing Name", "Developer", "City", "Neighbourhood", "Price Range", "Listing Status", "Build Status", "Move-In", "Beds", "Baths", "Sq Ft", "Strata Fee", "Units Avail.", "Total Units", "Property Type", "Sales Center Address", "Phone", "Email", "Source URL"')
        .eq('Listing Name', listingName)
        .limit(1);

    if (listingError || !listingRows || listingRows.length === 0) {
        console.error('Error fetching presale listing by name:', listingError);
        return null;
    }

    const listing = mapRawListing(listingRows[0] as Record<string, unknown>);

    const resolvedImages = images.map((img) => ({
        url: resolveImageUrl(img),
        alt: `${listing.listing_name} - Image ${img.image_number}`,
    })).filter((img) => img.url !== '');

    return {
        ...listing,
        slug,
        images: resolvedImages,
        cover_image: resolvedImages.length > 0 ? resolvedImages[0].url : null,
    };
}

/**
 * Get all slugs for generateStaticParams.
 */
export async function getAllPresaleSlugs(): Promise<string[]> {
    const listings = await getAllPresaleListings();
    return listings.map((l) => l.slug);
}

function normalizeForAreaMatch(s: string): string {
    return s
        .split(',')[0]
        .trim()
        .toLowerCase();
}

/**
 * Presale rows whose City or Neighbourhood matches an Areas We Serve name (e.g. "North Vancouver", "Burnaby").
 */
export function filterPresaleListingsByAreaName(
    list: PresaleWithImages[],
    areaName: string
): PresaleWithImages[] {
    const target = normalizeForAreaMatch(areaName);
    if (!target) return [];
    return list.filter((p) => {
        const city = normalizeForAreaMatch(p.city || '');
        const neighbourhood = normalizeForAreaMatch(p.neighbourhood || '');
        return city === target || neighbourhood === target;
    });
}

/**
 * All presale listings for a given area page (Supabase), filtered to match {areaName}.
 */
export async function getPresaleListingsForAreaName(
    areaName: string
): Promise<PresaleWithImages[]> {
    const all = await getAllPresaleListings();
    return filterPresaleListingsByAreaName(all, areaName);
}
