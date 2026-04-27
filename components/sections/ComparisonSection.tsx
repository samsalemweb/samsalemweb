'use client';

import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';

const samSalemQualities = [
    {
        title: 'Friendly Guidance',
        description: 'Honest advice to help you make the best decision for your future.',
    },
    {
        title: 'Step-by-Step Support',
        description: 'From first showing to final signing — we handle every detail.',
    },
    {
        title: 'Personalized Strategy',
        description: 'Tailored advice that fits your unique goals and lifestyle.',
    },
    {
        title: 'Local Market Expert',
        description: 'Deep knowledge of Greater Vancouver neighborhoods and trends.',
    },
];

export default function ComparisonSection() {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/vancomp.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                {/* Stronger dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/55" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Glassmorphism Box */}
                <div className="bg-black/40 backdrop-blur-lg border border-white/15 rounded-2xl p-6 md:p-10 shadow-2xl">
                    {/* Header */}
                    <ScrollReveal direction="up" delay={0.1}>
                        <div className="text-center mb-8">
                            <span className="inline-block text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                                About Sam Salem
                            </span>
                            <WordReveal
                                text="A commitment to excellence in every detail."
                                className="text-2xl md:text-4xl lg:text-[2.75rem] font-cinzel font-semibold leading-tight tracking-tight text-white"
                                delay={0.2}
                            />
                        </div>
                    </ScrollReveal>

                    {/* Qualities Grid */}
                    <StaggerContainer stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
                        {samSalemQualities.map((item, i) => (
                            <StaggerItem key={i} direction="up">
                                <div className="flex items-start gap-4 py-5 border-b border-white/15 last:border-0">
                                    {/* Gold checkmark */}
                                    <div className="w-7 h-7 rounded-full bg-[#C9A84C]/25 border border-[#C9A84C]/50 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-base mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-white/80 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}
