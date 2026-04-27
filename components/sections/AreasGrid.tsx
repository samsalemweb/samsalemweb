'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Area } from '@/lib/types';
import areasData from '@/lib/data/areas.json';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';

const areas = (areasData as Area[]).slice(0, 6);

export default function AreasGrid() {
    return (
        <section className="py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                <div className="mb-16">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label mb-6">Neighborhood</span>
                    </ScrollReveal>
                    <WordReveal
                        text="Where you live matters — pick the perfect spot"
                        className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-2xl"
                        delay={0.2}
                    />
                </div>

                <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areas.map((area) => (
                        <StaggerItem key={area.slug} direction="up">
                            <Link href={`/areas/${area.slug}`} className="group block">
                                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                                    <Image
                                        src={area.image}
                                        alt={area.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-primary">
                                        {area.name}, BC
                                    </h3>
                                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

