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

/** Stable URL slug: id prefix avoids collisions when listing names repeat. */
export function buildPresaleSlug(id: number, listingName: string): string {
    const base = deriveSlug(listingName);
    return base ? `${id}-${base}` : String(id);
}

function parsePresaleSlug(slug: string): { id: number | null; legacySlug: string } {
    const match = slug.match(/^(\d+)-(.+)$/);
    if (match) {
        return { id: Number(match[1]), legacySlug: match[2] };
    }
    return { id: null, legacySlug: slug };
}

function pickString(row: Record<string, unknown>, ...keys: string[]): string {
    for (const key of keys) {
        const value = row[key];
        if (typeof value === 'string' && value.trim() !== '') {
            return value.trim();
        }
    }
    return '';
}

/**
 * Map a Supabase presale_listings row (quoted column names) to our TS interface.
 */
function mapRawListing(row: Record<string, unknown>): PresaleListing | null {
    const listingName = pickString(row, 'Listing Name', 'listing_name');
    if (!listingName) return null;

    const idRaw = row.id ?? row.ID;
    const id = typeof idRaw === 'number' ? idRaw : Number(idRaw);
    if (!Number.isFinite(id)) return null;

    return {
        id,
        listing_name: listingName,
        developer: pickString(row, 'Developer', 'developer'),
        city: pickString(row, 'City', 'city'),
        neighbourhood: pickString(row, 'Neighbourhood', 'neighbourhood'),
        price_range: pickString(row, 'Price Range', 'price_range'),
        listing_status: pickString(row, 'Listing Status', 'listing_status'),
        build_status: pickString(row, 'Build Status', 'build_status'),
        move_in: pickString(row, 'Move-In', 'move_in'),
        beds: pickString(row, 'Beds', 'beds'),
        baths: pickString(row, 'Baths', 'baths'),
        sq_ft: pickString(row, 'Sq Ft', 'sq_ft'),
        strata_fee: pickString(row, 'Strata Fee', 'strata_fee'),
        units_avail: pickString(row, 'Units Avail.', 'units_avail'),
        total_units: pickString(row, 'Total Units', 'total_units'),
        property_type: pickString(row, 'Property Type', 'property_type'),
        sales_center_address: pickString(row, 'Sales Center Address', 'sales_center_address'),
        phone: pickString(row, 'Phone', 'phone'),
        email: pickString(row, 'Email', 'email'),
        source_url: pickString(row, 'Source URL', 'source_url'),
    };
}

function mapRawImage(row: Record<string, unknown>): PresaleListingImage | null {
    const listingName = pickString(row, 'Listing Name', 'listing_name');
    if (!listingName) return null;

    const imageNumberRaw = row['Image #'] ?? row.image_number;
    const image_number =
        typeof imageNumberRaw === 'number' ? imageNumberRaw : Number(imageNumberRaw) || 0;

    return {
        listing_name: listingName,
        slug: pickString(row, 'Slug', 'slug'),
        image_number,
        cloudinary_public_id: pickString(row, 'Cloudinary Public ID', 'cloudinary_public_id'),
        original_livabl_image_url: pickString(
            row,
            'Original Livabl Image URL',
            'original_livabl_image_url',
        ),
        cloudinary_url: pickString(row, 'Cloudinary URL (fill after upload)', 'cloudinary_url'),
    };
}

function normalizePriceRange(priceRange: string): string {
    if (!priceRange) return priceRange;
    if (priceRange.toLowerCase().includes('see source url')) {
        return 'Pricing Coming Soon';
    }
    return priceRange;
}

function shouldIncludeListing(listing: PresaleListing): boolean {
    if (listing.property_type === 'Builder Page') return false;
    if (listing.price_range && listing.price_range.includes('N/A')) return false;
    if (listing.listing_status === 'Sold Out') return false;
    return true;
}

async function fetchPresaleImages(): Promise<PresaleListingImage[]> {
    const { data, error } = await supabase.from('presale_listing_images').select('*');

    if (error) {
        // Images table is optional; listings still work without it.
        console.warn('presale_listing_images unavailable:', error.message);
        return [];
    }

    return (data || [])
        .map((row) => mapRawImage(row as Record<string, unknown>))
        .filter((img): img is PresaleListingImage => img !== null)
        .sort((a, b) => a.image_number - b.image_number);
}

function attachImages(
    listing: PresaleListing,
    imagesByName: Map<string, PresaleListingImage[]>,
    slugByName: Map<string, string>,
): PresaleWithImages {
    const listingImages = imagesByName.get(listing.listing_name) || [];

    const resolvedImages = listingImages
        .map((img) => ({
            url: resolveImageUrl(img),
            alt: `${listing.listing_name} - Image ${img.image_number}`,
        }))
        .filter((img) => img.url !== '');

    const slug =
        slugByName.get(listing.listing_name) || buildPresaleSlug(listing.id, listing.listing_name);

    return {
        ...listing,
        price_range: normalizePriceRange(listing.price_range),
        slug,
        images: resolvedImages,
        cover_image: resolvedImages.length > 0 ? resolvedImages[0].url : null,
    };
}

// ---- public API ----

/**
 * Fetch all presale listings with optional images joined.
 */
export async function getAllPresaleListings(): Promise<PresaleWithImages[]> {
    const [listingsRes, images] = await Promise.all([
        supabase.from('presale_listings').select('*'),
        fetchPresaleImages(),
    ]);

    if (listingsRes.error) {
        console.error('Error fetching presale_listings:', listingsRes.error);
        return [];
    }

    const rawListings = (listingsRes.data || []) as Record<string, unknown>[];
    const listings = rawListings
        .map(mapRawListing)
        .filter((listing): listing is PresaleListing => listing !== null)
        .filter(shouldIncludeListing);

    const imagesByName = new Map<string, PresaleListingImage[]>();
    const slugByName = new Map<string, string>();

    for (const img of images) {
        const key = img.listing_name;
        if (!imagesByName.has(key)) imagesByName.set(key, []);
        imagesByName.get(key)!.push(img);
        if (img.slug && !slugByName.has(key)) {
            slugByName.set(key, img.slug);
        }
    }

    return listings.map((listing) => attachImages(listing, imagesByName, slugByName));
}

/**
 * Fetch a single presale listing by slug.
 */
export async function getPresaleBySlug(slug: string): Promise<PresaleWithImages | null> {
    const { id: slugId, legacySlug } = parsePresaleSlug(slug);

    if (slugId !== null) {
        const { data, error } = await supabase
            .from('presale_listings')
            .select('*')
            .eq('id', slugId)
            .maybeSingle();

        if (!error && data) {
            const listing = mapRawListing(data as Record<string, unknown>);
            if (listing && shouldIncludeListing(listing)) {
                const images = await fetchPresaleImages();
                const imagesByName = new Map<string, PresaleListingImage[]>();
                const slugByName = new Map<string, string>();
                for (const img of images) {
                    if (!imagesByName.has(img.listing_name)) imagesByName.set(img.listing_name, []);
                    imagesByName.get(img.listing_name)!.push(img);
                    if (img.slug && !slugByName.has(img.listing_name)) {
                        slugByName.set(img.listing_name, img.slug);
                    }
                }
                return attachImages(listing, imagesByName, slugByName);
            }
        }
    }

    // Legacy slugs from images table or name-only slugs
    const images = await fetchPresaleImages();
    const imageMatch = images.find(
        (img) => img.slug === slug || img.slug === legacySlug,
    );

    if (imageMatch) {
        const { data, error } = await supabase
            .from('presale_listings')
            .select('*')
            .eq('Listing Name', imageMatch.listing_name)
            .limit(1);

        if (!error && data && data.length > 0) {
            const listing = mapRawListing(data[0] as Record<string, unknown>);
            if (listing && shouldIncludeListing(listing)) {
                const imagesByName = new Map<string, PresaleListingImage[]>();
                const slugByName = new Map<string, string>([[imageMatch.listing_name, slug]]);
                for (const img of images) {
                    if (!imagesByName.has(img.listing_name)) imagesByName.set(img.listing_name, []);
                    imagesByName.get(img.listing_name)!.push(img);
                }
                return attachImages(listing, imagesByName, slugByName);
            }
        }
    }

    const allListings = await getAllPresaleListings();
    return (
        allListings.find(
            (l) =>
                l.slug === slug ||
                l.slug === legacySlug ||
                deriveSlug(l.listing_name) === legacySlug ||
                deriveSlug(l.listing_name) === slug,
        ) ?? null
    );
}

/**
 * Get all slugs for generateStaticParams.
 */
export async function getAllPresaleSlugs(): Promise<string[]> {
    const listings = await getAllPresaleListings();
    return listings.map((l) => l.slug);
}

function normalizeForAreaMatch(s: string): string {
    return s.split(',')[0].trim().toLowerCase();
}

/**
 * Presale rows whose City or Neighbourhood matches an Areas We Serve name.
 */
export function filterPresaleListingsByAreaName(
    list: PresaleWithImages[],
    areaName: string,
): PresaleWithImages[] {
    const target = normalizeForAreaMatch(areaName);
    if (!target) return [];
    return list.filter((p) => {
        const city = normalizeForAreaMatch(p.city || '');
        const neighbourhood = normalizeForAreaMatch(p.neighbourhood || '');
        return city === target || neighbourhood === target;
    });
}

export async function getPresaleListingsForAreaName(
    areaName: string,
): Promise<PresaleWithImages[]> {
    const all = await getAllPresaleListings();
    return filterPresaleListingsByAreaName(all, areaName);
}
