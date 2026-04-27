import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getOfficeListingBySlug, getAllOfficeListingSlugs } from '@/lib/office-listings';
import ImageGallery from '@/components/presale/ImageGallery';

export const revalidate = 3600;

export async function generateStaticParams() {
    const slugs = await getAllOfficeListingSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const listing = await getOfficeListingBySlug(params.slug);
    if (!listing) return { title: 'Listing Not Found' };
    return {
        title: `${listing.title} | Office Listing | Sam Salem`,
        description: listing.description
            ? listing.description.substring(0, 160)
            : `View details for ${listing.title} in ${listing.city}. Contact Sam Salem for more information.`,
    };
}

const offerBadgeColors: Record<string, string> = {
    'For Sale': 'bg-emerald-500 text-white',
    'For Rent': 'bg-amber-500 text-white',
};

export default async function OfficeListingDetailPage({ params }: { params: { slug: string } }) {
    const listing = await getOfficeListingBySlug(params.slug);
    if (!listing) notFound();

    const isEmptyPrice = !listing.price || listing.price === '—' || listing.price.trim() === '';

    const detailRows: { label: string; value: string }[] = [
        { label: 'Property Type', value: listing.property_type },
        { label: 'City', value: listing.city },
        { label: 'Neighbourhood', value: listing.neighbourhood },
        { label: 'Address', value: listing.address },
        { label: 'Bedrooms', value: listing.beds },
        { label: 'Bathrooms', value: listing.baths },
        { label: 'Sq Ft', value: listing.sq_ft },
        { label: 'Lot Size', value: listing.lot },
        { label: 'Year Built', value: listing.year_built },
        { label: 'Annual Tax', value: listing.tax },
        { label: 'Strata Fee', value: listing.strata_fee },
    ].filter((row) => row.value && row.value.trim() !== '');

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="relative pt-32 pb-10 md:pt-36 md:pb-12 bg-primary">
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/90" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/listing/office-listing" className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors mb-6 text-sm font-body">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Office Listings
                    </Link>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {listing.offer_type && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm ${offerBadgeColors[listing.offer_type] || 'bg-accent text-white'}`}>
                                {listing.offer_type}
                            </span>
                        )}
                        {listing.property_type && (
                            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase border border-white/20">
                                {listing.property_type}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-white mb-3 tracking-tight">
                        {listing.title}
                    </h1>
                    {listing.city && (
                        <p className="flex items-center gap-2 text-white/60 text-base font-body">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {listing.city}{listing.neighbourhood && listing.neighbourhood !== listing.city ? ` · ${listing.neighbourhood}` : ''}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Gallery + Details */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Image Gallery */}
                        {listing.images.length > 0 && (
                            <ImageGallery images={listing.images} title={listing.title} />
                        )}

                        {/* Price */}
                        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-2">Price</p>
                            {isEmptyPrice ? (
                                <p className="text-2xl font-heading font-semibold text-accent italic">Pricing Coming Soon</p>
                            ) : (
                                <p className="text-2xl font-heading font-semibold text-foreground">{listing.price}</p>
                            )}
                        </div>

                        {/* Details Grid */}
                        {detailRows.length > 0 && (
                            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                                <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Property Details</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
                                    {detailRows.map((row) => (
                                        <div key={row.label}>
                                            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-1">{row.label}</p>
                                            <p className="text-sm font-medium text-foreground">{row.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {listing.description && listing.description.trim() && (
                            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">About This Property</h2>
                                <p className="text-muted font-body leading-relaxed whitespace-pre-line">{listing.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Contact CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-primary flex items-center justify-center relative">
                                        <Image
                                            src="/samsalempicture.jpg"
                                            alt="Sam Salem"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-foreground">Sam Salem</h3>
                                        <p className="text-muted text-xs">REALTOR® | PREC</p>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <a href="tel:+16044452030" className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        +1 (604) 445-2030
                                    </a>
                                    <a href="mailto:salemhomes@yahoo.com" className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                        salemhomes@yahoo.com
                                    </a>
                                </div>
                                <Link
                                    href="/contact"
                                    className="block w-full text-center py-3.5 px-6 bg-accent text-primary font-heading font-semibold rounded-xl hover:bg-accent/90 transition-all text-sm tracking-wide uppercase"
                                >
                                    Contact Sam
                                </Link>
                            </div>

                            {/* Quick Stats Card */}
                            {(listing.beds || listing.baths || listing.sq_ft) && (
                                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                                    <h3 className="font-heading font-semibold text-foreground mb-4 text-sm">Quick Summary</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {listing.beds && (
                                            <div className="text-center p-3 rounded-xl bg-background">
                                                <p className="text-xl font-heading font-semibold text-foreground">{listing.beds}</p>
                                                <p className="text-[10px] font-medium text-muted uppercase tracking-widest">Beds</p>
                                            </div>
                                        )}
                                        {listing.baths && (
                                            <div className="text-center p-3 rounded-xl bg-background">
                                                <p className="text-xl font-heading font-semibold text-foreground">{listing.baths}</p>
                                                <p className="text-[10px] font-medium text-muted uppercase tracking-widest">Baths</p>
                                            </div>
                                        )}
                                        {listing.sq_ft && (
                                            <div className="text-center p-3 rounded-xl bg-background">
                                                <p className="text-xl font-heading font-semibold text-foreground">{listing.sq_ft}</p>
                                                <p className="text-[10px] font-medium text-muted uppercase tracking-widest">Sq Ft</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
