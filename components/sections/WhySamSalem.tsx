'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';

const services = [
    {
        title: 'Presale Properties',
        description: 'Your most reliable resource for up-to-date insights on new and upcoming real estate developments in Greater Vancouver. Get early access to the hottest projects with expert guidance.',
        link: '/buy/presale',
    },
    {
        title: 'Buy a Property',
        description: 'Exceptional service centered on precision, strategy, and white-glove client care designed for today\'s discerning buyers. From condos to luxury homes across Greater Vancouver.',
        link: '/buy/samslisting',
    },
    {
        title: 'Sell Your Property',
        description: 'Premium marketing, deep market intelligence, and master-level negotiation to get your home sold quickly and for top dollar. A refined, full-service real estate experience.',
        link: '/sell',
    },
    {
        title: 'Investment Properties',
        description: 'Multi-family and commercial property specialist with detailed ROI and valuation analysis for investors. 20+ years of experience in luxury and commercial properties.',
        link: '/contact',
    },
];

export default function WhySamSalem() {
    const [expandedIndex, setExpandedIndex] = useState<number>(0);

    return (
        <section className="py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                <div className="text-center mb-16">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label justify-center mb-6">Services</span>
                    </ScrollReveal>
                    <WordReveal
                        text="Service, support, and strategy — made simple from start to finish."
                        className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-3xl mx-auto"
                        delay={0.2}
                    />
                </div>

                <div className="max-w-3xl mx-auto">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.title} direction="up" delay={0.1 * index}>
                            <div className="border-b border-border">
                                <button
                                    onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                                    className="w-full flex items-center gap-4 py-6 text-left group"
                                >
                                    <motion.div
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${expandedIndex === index
                                            ? 'bg-primary border-primary text-white'
                                            : 'border-border text-muted group-hover:border-primary group-hover:text-primary'
                                            }`}
                                        animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-medium">
                                        {service.title}
                                    </h3>
                                </button>
                                <AnimatePresence initial={false}>
                                    {expandedIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-14 pb-6">
                                                <p className="text-muted leading-relaxed mb-4 max-w-xl">
                                                    {service.description}
                                                </p>
                                                <Link
                                                    href={service.link}
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                                                >
                                                    Learn more
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
