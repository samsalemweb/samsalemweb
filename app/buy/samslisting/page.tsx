import Image from 'next/image';
import Link from 'next/link';
import { getAllMyListings } from '@/lib/my-listings';

export const revalidate = 3600;

export const metadata = {
    title: "Sam Salem's Current Listings | Sam Salem | PREC",
    description:
        "Browse Sam Salem's active MLS listings in Greater Vancouver. Luxury condos, townhomes, and detached homes.",
};

export default async function SamSalemsListingPage() {
    const listings = await getAllMyListings();

    const isEmptyPrice = (price: string) =>
        !price || price === '—' || price.trim() === '';

    const statsRow = (listing: { beds: string; baths: string; sq_ft: string }) => {
        const parts: string[] = [];
        if (listing.beds?.trim()) parts.push(`${listing.beds} Beds`);
        if (listing.baths?.trim()) parts.push(`${listing.baths} Baths`);
        if (listing.sq_ft?.trim()) parts.push(`${listing.sq_ft} Sq Ft`);
        return parts;
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-primary" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-background" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 font-body" style={{ color: '#C9A84C' }}>
                        Active Listings
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-medium text-white mb-6 tracking-tight">
                        Sam Salem's Greater Vancouver Real Estate Listings
                    </h1>
                    <p className="max-w-3xl mx-auto mt-6 text-white/80 font-body text-lg">
  Browse Sam Salem's featured real estate listings across Greater Vancouver,
  including Vancouver, Burnaby, Coquitlam, North Vancouver, West Vancouver,
  Richmond, Surrey, and surrounding communities. Explore condos, townhomes,
  detached homes, and investment properties currently available on the market.
</p>
                    <div className="w-24 h-[2px] mx-auto" style={{ backgroundColor: '#C9A84C' }} />
                </div>
            </div>

            {/* Listing Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {listings.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted font-body text-lg">No active listings at this time.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {listings.map((listing) => (
                            <Link
                                key={listing.slug}
                                href={`/buy/samslisting/${listing.slug}`}
                                className="group block"
                            >
                                <div
                                    className="rounded-2xl overflow-hidden border border-border bg-white transition-all duration-500 h-full flex flex-col hover:border-accent/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                                >
                                    {/* Cover Image */}
                                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                                        {listing.cover_image ? (
                                            <Image
                                                src={listing.cover_image}
                                                alt={listing.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center bg-gray-100"
                                            >
                                                <span className="text-muted text-sm font-body">No image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        {/* Building name */}
                                        {listing.building?.trim() && (
                                            <span
                                                className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-1 font-body"
                                                style={{ color: '#C9A84C' }}
                                            >
                                                {listing.building}
                                            </span>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-xl font-cinzel font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                                            {listing.title}
                                        </h3>

                                        {/* Price */}
                                        {isEmptyPrice(listing.price) ? (
                                            <p className="text-lg font-cinzel font-medium italic mb-3" style={{ color: '#C9A84C' }}>
                                                Pricing On Request
                                            </p>
                                        ) : (
                                            <p className="text-lg font-cinzel font-semibold mb-3" style={{ color: '#C9A84C' }}>
                                                {listing.price}
                                            </p>
                                        )}

                                        {/* Stats Row */}
                                        {statsRow(listing).length > 0 && (
                                            <p className="text-sm text-muted font-body mb-4">
                                                {statsRow(listing).join(' · ')}
                                            </p>
                                        )}

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {listing.property_type?.trim() && (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border border-border text-muted font-body">
                                                    {listing.property_type}
                                                </span>
                                            )}
                                            {listing.city?.trim() && (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border border-border text-muted font-body">
                                                    {listing.city}
                                                </span>
                                            )}
                                        </div>

                                        {/* View Details */}
                                        <div className="mt-auto pt-4 border-t border-border">
                                            <span
                                                className="inline-flex items-center gap-2 text-sm font-semibold font-body group-hover:gap-3 transition-all duration-300"
                                                style={{ color: '#C9A84C' }}
                                            >
                                                View Details
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
