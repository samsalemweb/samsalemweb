import { getPresaleBySlug, getAllPresaleSlugs } from '@/lib/presale';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ImageGallery from '@/components/presale/ImageGallery';
import Link from 'next/link';

export const revalidate = 3600;

const statusColors: Record<string, string> = {
    'Selling': 'bg-emerald-500/90 text-white',
    'Registration': 'bg-blue-500/90 text-white',
    'Coming Soon': 'bg-amber-500/90 text-white',
    'Sold Out': 'bg-gray-500/90 text-white',
};

const buildStatusColors: Record<string, string> = {
    'Preconstruction': 'bg-blue-100 text-blue-800',
    'Construction': 'bg-amber-100 text-amber-800',
    'Complete': 'bg-emerald-100 text-emerald-800',
};

// Pre-generate all presale slugs at build time
export async function generateStaticParams() {
    const slugs = await getAllPresaleSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per listing
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const listing = await getPresaleBySlug(slug);
    if (!listing) return {};

    return {
        title: `${listing.listing_name} | Presale | Sam Salem`,
        description: `${listing.listing_name} by ${listing.developer} in ${listing.city}. ${listing.price_range}`,
        alternates: {
        canonical: `/presale/${slug}`,
    },
        openGraph: {
            title: `${listing.listing_name} | Presale | Sam Salem`,
            description: `${listing.listing_name} by ${listing.developer} in ${listing.city}`,
            images: listing.cover_image ? [listing.cover_image] : [],
            type: 'website',
        },
    };
}

export default async function PresaleDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const listing = await getPresaleBySlug(slug);

    if (!listing) notFound();

    const isMasterPlanned = listing.property_type === 'Master Planned Community';
    const statusClass = statusColors[listing.listing_status] || 'bg-accent/90 text-white';
    const buildClass = buildStatusColors[listing.build_status] || 'bg-gray-100 text-gray-800';

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="pt-28 pb-4 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/presale" className="hover:text-accent transition-colors">
                            Presale Properties
                        </Link>
                        <span>/</span>
                        <span className="text-foreground font-medium">{listing.listing_name}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column - Gallery + Details */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Image Gallery */}
                        <ImageGallery images={listing.images} title={listing.listing_name} />

                        {/* Title & Badges */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold tracking-wide">
                                    {listing.property_type}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${statusClass}`}>
                                    {listing.listing_status}
                                </span>
                                {listing.build_status && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${buildClass}`}>
                                        {listing.build_status}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-heading font-medium text-foreground mb-2 tracking-tight">
                                {listing.listing_name}
                            </h1>
                            <p className="text-muted font-body text-lg">
                                {listing.city}{listing.neighbourhood && listing.neighbourhood !== listing.city ? ` · ${listing.neighbourhood}` : ''}
                            </p>
                            {listing.price_range && (
                                <p className="text-2xl font-heading font-semibold text-foreground mt-4">
                                    {listing.price_range}
                                </p>
                            )}
                        </div>

                        {/* Key Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {!isMasterPlanned && listing.beds && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Bedrooms</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.beds}</p>
                                </div>
                            )}
                            {!isMasterPlanned && listing.baths && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Bathrooms</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.baths}</p>
                                </div>
                            )}
                            {listing.sq_ft && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Sq Ft</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.sq_ft}</p>
                                </div>
                            )}
                            {listing.total_units && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Total Units</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.total_units}</p>
                                </div>
                            )}
                            {listing.units_avail && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Units Available</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.units_avail}</p>
                                </div>
                            )}
                            {listing.move_in && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Move-In</p>
                                    <p className="text-lg font-heading font-medium text-foreground">{listing.move_in}</p>
                                </div>
                            )}
                            {listing.strata_fee && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Strata Fee</p>
                                    <p className="text-lg font-heading font-medium text-foreground">{listing.strata_fee}</p>
                                </div>
                            )}
                            {isMasterPlanned && (
                                <div className="bg-accent/5 rounded-2xl border border-accent/20 p-5 col-span-2">
                                    <p className="text-xs text-accent font-semibold tracking-widest uppercase mb-1">Community</p>
                                    <p className="text-lg font-heading font-medium text-foreground">Master Planned Community</p>
                                </div>
                            )}
                        </div>

                        {/* Developer & Build Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {listing.developer && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Developer</p>
                                    <p className="text-base font-heading font-medium text-foreground">{listing.developer}</p>
                                </div>
                            )}
                            {listing.build_status && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Build Status</p>
                                    <p className="text-base font-heading font-medium text-foreground">{listing.build_status}</p>
                                </div>
                            )}
                        </div>


                    </div>

                    {/* Right Column - Contact CTA (Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            {/* Contact Card */}
                            <div className="bg-primary rounded-3xl p-8 text-white">
                                <h3 className="text-xl font-heading font-medium mb-2">
                                    Interested in {listing.listing_name}?
                                </h3>
                                <p className="text-white/70 text-sm font-body mb-6 leading-relaxed">
                                    Contact Sam Salem for exclusive presale pricing, floor plans, and VIP access to this development.
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href="tel:+16044452030"
                                        className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors"
                                    >
                                        <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <span className="text-xs text-white/50 block">Sam Salem</span>
                                            <span className="text-sm font-medium">+1 (604) 445-2030</span>
                                        </div>
                                    </a>
                                    <a
                                        href="mailto:salemhomes@yahoo.com"
                                        className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors"
                                    >
                                        <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                        </span>
                                        <div>
                                            <span className="text-xs text-white/50 block">Sam Salem</span>
                                            <span className="text-sm font-medium">salemhomes@yahoo.com</span>
                                        </div>
                                    </a>
                                </div>

                                <Link
                                    href="/contact"
                                    className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-body font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg text-sm"
                                >
                                    Request Info
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-white rounded-3xl border border-border p-6">
                                <h4 className="text-sm font-heading font-semibold text-foreground mb-4">Quick Facts</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted">City</span>
                                        <span className="font-medium text-foreground">{listing.city}</span>
                                    </div>
                                    {listing.neighbourhood && listing.neighbourhood !== listing.city && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted">Neighbourhood</span>
                                            <span className="font-medium text-foreground">{listing.neighbourhood}</span>
                                        </div>
                                    )}
                                    {listing.property_type && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted">Property Type</span>
                                            <span className="font-medium text-foreground">{listing.property_type}</span>
                                        </div>
                                    )}
                                    {listing.listing_status && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted">Status</span>
                                            <span className="font-medium text-foreground">{listing.listing_status}</span>
                                        </div>
                                    )}
                                    {listing.build_status && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted">Build Status</span>
                                            <span className="font-medium text-foreground">{listing.build_status}</span>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
