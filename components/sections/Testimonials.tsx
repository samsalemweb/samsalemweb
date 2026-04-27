'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Testimonial } from '@/lib/types';
import testimonialsData from '@/lib/data/testimonials.json';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';

const testimonials = (testimonialsData as Testimonial[]).slice(0, 3);

export default function Testimonials() {
    return (
        <section className="py-16 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=60"
                    alt=""
                    fill
                    className="object-cover opacity-10"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                <div className="mb-12">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label mb-6">Reviews</span>
                    </ScrollReveal>
                    <WordReveal
                        text="Stories from people who found their place with us"
                        className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-2xl"
                        delay={0.2}
                    />
                </div>

                {/* 3-Card Grid */}
                <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {testimonials.map((t) => (
                        <StaggerItem key={t.id} direction="up">
                            <div className="bg-cream/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-border h-full flex flex-col">
                                {/* Stars */}
                                <div className="flex gap-1 mb-5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < t.rating ? 'text-accent' : 'text-gray-200'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-sm md:text-base leading-relaxed text-primary/80 mb-6 flex-1">
                                    &ldquo;{t.text}&rdquo;
                                </blockquote>

                                {/* Author */}
                                <div className="pt-4 border-t border-border mt-auto">
                                    <p className="font-semibold text-primary text-sm">{t.name}</p>
                                    <p className="text-xs text-muted">{t.location}</p>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Google Reviews Link */}
                <ScrollReveal direction="up" delay={0.4}>
                    <div className="flex justify-center">
                        <Link
                            href="https://share.google/fTgndbGqchpLvIkMX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-border rounded-full text-primary font-semibold text-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Read more reviews on Google
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
