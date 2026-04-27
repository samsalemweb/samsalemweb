import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import areasData from '@/lib/data/areas.json';
import listingsData from '@/lib/data/listings.json';
import { Area, Listing } from '@/lib/types';
import ListingGrid from '@/components/listings/ListingGrid';
import PresaleCard from '@/components/presale/PresaleCard';
import { getPresaleListingsForAreaName } from '@/lib/presale';

export const revalidate = 3600;

interface Props {
    params: { slug: string };
}

export function generateStaticParams() {
    return (areasData as Area[]).map((area) => ({ slug: area.slug }));
}

export default async function AreaDetailPage({ params }: Props) {
    const area = (areasData as Area[]).find((a) => a.slug === params.slug);
    if (!area) notFound();

    const preSaleInArea = await getPresaleListingsForAreaName(area.name);
    const areaListings = (listingsData as Listing[]).filter((l) => {
        if (l.status === 'Sold') return false;
        if (l.area === area.name) return true;
        if (l.city === area.name) return true;
        return false;
    });
    const hasListings = areaListings.length > 0;
    const hasPresale = preSaleInArea.length > 0;
    const hasAny = hasListings || hasPresale;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <div className="relative h-[40vh] md:h-[50vh]">
                <div className="relative w-full h-full">
                    <Image src={area.image} alt={area.name} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-heading font-semibold text-white mb-2">{area.name}</h1>
                        <p className="text-white/80 font-body text-lg">Average price: {formatPrice(area.avgPrice)}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Description */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-10">
                    <p className="text-muted font-body text-base leading-relaxed mb-6">{area.description}</p>
                    <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Highlights</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {area.highlights.map((h) => (
                                <div key={h} className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-foreground font-body text-sm">{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Listings */}
                <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
                    Available properties in {area.name}
                </h2>
                {!hasAny ? (
                    <div className="text-center py-20 rounded-2xl border border-gray-100 bg-white">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No properties found</h3>
                        <p className="text-muted font-body text-sm">Check back soon or contact Sam to hear about new listings in this area.</p>
                    </div>
                ) : (
                    <>
                        {hasListings && <ListingGrid listings={areaListings} />}
                        {hasListings && hasPresale && <div className="h-10" />}
                        {hasPresale && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {preSaleInArea.map((listing) => (
                                    <PresaleCard key={listing.slug} listing={listing} />
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className="mt-10">
                    <Link href="/areas" className="inline-flex items-center text-primary font-body font-medium hover:text-accent transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to all areas
                    </Link>
                </div>
            </div>
        </div>
    );
}
