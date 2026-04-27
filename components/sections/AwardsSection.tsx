'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';

const awards = [
    {
        image: '/sam-salem-poster-2.jpg',
        title: 'Canadian Choice Award 2025',
        description: 'Celebrating success with the Canadian Choice Award 2025. Thank you for believing in us!',
    },
    {
        image: '/Winner-Social-Media-Post-2026-2.png',
        title: 'Canadian Choice Award 2026',
        description: "We're thrilled to announce — we are a 2026 Canadian Choice Award Winner!",
    },
    {
        image: '/DSC04398.jpg',
        title: 'Award Ceremony Highlight',
        description: 'Honored to be recognized at this prestigious event celebrating excellence in real estate.',
    },
    {
        image: '/DSC04399.jpg',
        title: 'Excellence in Service',
        description: 'A proud moment of recognition for our dedication to exceptional client service.',
    },
    {
        image: '/DSC04400.jpg',
        title: 'Industry Recognition',
        description: 'Celebrating milestones and achievements alongside industry leaders.',
    },
    {
        image: '/DSC04401.jpg',
        title: 'Commitment to Excellence',
        description: 'Another milestone in our journey of delivering outstanding real estate experiences.',
    },
];

export default function AwardsSection() {
    return (
        <section className="py-16 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal direction="none" blur>
                    <div className="w-24 h-px bg-accent/40 mx-auto mb-16" />
                </ScrollReveal>

                <div className="text-center mb-16 md:mb-20">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="inline-flex items-center gap-2 text-accent text-xs font-sans font-medium tracking-[0.25em] uppercase mb-6">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Awards & Recognition
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </span>
                    </ScrollReveal>
                    <WordReveal
                        text="Excellence recognized, trust earned"
                        className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-semibold leading-tight tracking-tight max-w-3xl mx-auto text-white"
                        delay={0.2}
                    />
                    <ScrollReveal direction="up" delay={0.4}>
                        <p className="mt-6 text-white/50 text-base md:text-lg max-w-xl mx-auto font-sans leading-relaxed">
                            Proud recipient of the Canadian Choice Award — a testament to our unwavering commitment to exceptional real estate service.
                        </p>
                    </ScrollReveal>
                </div>

                <StaggerContainer stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
                    {awards.map((award) => (
                        <StaggerItem key={award.title} direction="up">
                            <motion.div
                                className="group relative"
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                {/* Card */}
                                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Image container */}
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <Image
                                            src={award.image}
                                            alt={award.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* Gradient overlay at bottom */}
                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                                    </div>

                                    {/* Text overlay */}
                                    <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-px bg-accent" />
                                            <span className="text-accent text-xs font-sans font-medium tracking-[0.2em] uppercase">
                                                Award Winner
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-cinzel font-semibold text-white mb-2">
                                            {award.title}
                                        </h3>
                                        <p className="text-white/60 text-sm font-sans leading-relaxed">
                                            {award.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-500" />
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
