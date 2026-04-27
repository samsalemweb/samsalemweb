'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PresaleWithImages } from '@/types/presale';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';
import HoverCard, { MagneticButton } from '@/components/animations/HoverCard';

const statusColors: Record<string, string> = {
    'Selling': 'bg-emerald-500 text-white',
    'Registration': 'bg-blue-500 text-white',
    'Coming Soon': 'bg-amber-500 text-white',
    'Sold Out': 'bg-gray-500 text-white',
};

interface FeaturedListingsClientProps {
    listings: PresaleWithImages[];
}

export default function FeaturedListingsClient({ listings }: FeaturedListingsClientProps) {
    const featured = listings.filter((l) => l.listing_status !== 'Sold Out').slice(0, 4);

    return (
        <section className="py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section divider */}
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                {/* Header */}
                <div className="mb-16">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label mb-6">Recent Listings</span>
                    </ScrollReveal>
                    <WordReveal
                        text="Take a peek at hottest homes and discover what could be yours"
                        className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-2xl"
                        delay={0.2}
                    />
                </div>

                {/* 2-column Grid with stagger */}
                <StaggerContainer stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {featured.map((listing) => (
                        <StaggerItem key={listing.slug} direction="up">
                            <HoverCard lift={-6} scaleAmount={1.01}>
                                <Link href={`/presale/${listing.slug}`} className="group block">
                                    {/* Image */}
                                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-5">
                                        {listing.cover_image ? (
                                            <Image
                                                src={listing.cover_image}
                                                alt={listing.listing_name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100" />
                                        )}
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${statusColors[listing.listing_status] || 'bg-accent text-white'}`}>
                                                {listing.listing_status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex items-start gap-2 mb-3">
                                        <svg className="w-4 h-4 mt-0.5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span className="text-xs font-medium tracking-wide uppercase text-muted">
                                            {listing.city}{listing.neighbourhood && listing.neighbourhood !== listing.city ? ` · ${listing.neighbourhood}` : ''}
                                        </span>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-primary/70">
                                            {listing.beds && (
                                                <>
                                                    <span className="flex items-center gap-1.5">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                        </svg>
                                                        {listing.beds} Beds
                                                    </span>
                                                    <span className="text-primary/30">•</span>
                                                </>
                                            )}
                                            {listing.total_units && (
                                                <span className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                    </svg>
                                                    {listing.total_units} Units
                                                </span>
                                            )}
                                        </div>
                                        {listing.developer && (
                                            <span className="text-xs text-muted font-medium">
                                                by {listing.developer}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="mt-3 text-lg font-medium text-primary group-hover:text-accent transition-colors leading-snug">
                                        {listing.listing_name}
                                    </h3>
                                    {listing.price_range && (
                                        <p className="mt-1 text-sm font-semibold text-foreground">{listing.price_range}</p>
                                    )}
                                </Link>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* View All Button */}
                <ScrollReveal direction="up" delay={0.3} className="flex justify-center mt-16">
                    <MagneticButton>
                        <Link href="/presale" className="btn-pill btn-pill-dark">
                            View Properties
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </MagneticButton>
                </ScrollReveal>
            </div>
        </section>
    );
}
