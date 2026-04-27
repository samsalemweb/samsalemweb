'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';

const steps = [
    {
        number: '01',
        label: 'Step 01',
        title: 'Search & explore',
        description:
            'Browse verified property listings by price, location, and lifestyle. Filter easily with smart tools and discover homes that fit your vibe. Start your journey from anywhere, right on your screen.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    },
    {
        number: '02',
        label: 'Step 02',
        title: 'Book a tour',
        description:
            'Pick your favorite properties and schedule tours online in seconds. Our team confirms quickly and arranges convenient times for you. See homes in person or through guided virtual tours.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
    {
        number: '03',
        label: 'Step 03',
        title: 'Make your move',
        description:
            'Get expert help with offers, negotiations, and all the paperwork. We guide you step by step, keeping everything clear and stress-free. From first offer to final signature, we\'re with you all the way.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    },
    {
        number: '04',
        label: 'Step 04',
        title: 'Close & celebrate',
        description:
            'Sign the deal and receive your new keys with confidence. We ensure a smooth closing process without last-minute surprises. Enjoy the moment — your new home is officially yours!',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    },
];

export default function ProcessSection() {
    return (
        <section className="py-16 md:py-28 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="none" blur>
                    <div className="gold-divider w-full mb-16" />
                </ScrollReveal>

                <div className="mb-16 text-center md:text-left">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label justify-center md:justify-start mb-6">Process</span>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <h2 className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-2xl mx-auto md:mx-0">
                            Starting with browsing and ending with move-in day
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central vertical line — desktop only */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <ScrollReveal key={step.number} direction="up" delay={0.1 + i * 0.1}>
                                    <div className="relative md:grid md:grid-cols-2 md:gap-12 md:py-12">
                                        {/* Central number badge — desktop */}
                                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-2xl bg-primary items-center justify-center">
                                            <span className="text-white font-heading text-lg font-semibold">{step.number}</span>
                                        </div>

                                        {/* Mobile number badge */}
                                        <div className="md:hidden flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                                <span className="text-white font-heading text-sm font-semibold">{step.number}</span>
                                            </div>
                                            <span className="text-xs font-semibold tracking-widest uppercase text-accent">{step.label}</span>
                                        </div>

                                        {/* Image */}
                                        <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                                                <Image
                                                    src={step.image}
                                                    alt={step.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>
                                        </div>

                                        {/* Text card */}
                                        <div className={`${isEven ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12 md:text-right'} mt-6 md:mt-0 flex flex-col justify-center`}>
                                            <span className="hidden md:inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                                                {step.label}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-cinzel font-semibold text-foreground mb-4">
                                                {step.title}
                                            </h3>
                                            <p className="text-muted text-sm md:text-base leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
