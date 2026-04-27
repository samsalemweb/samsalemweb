'use client';

import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';

const uniquePoints = [
    {
        title: 'Top 1% REALTOR in Greater Vancouver',
        points: [
            'President Club 2023 award recipient',
            '20+ years in luxury & commercial properties',
            'Master\'s in Civil Engineering — sharp analytical ability',
        ],
    },
    {
        title: 'Presale & new development expert',
        points: [
            'Greater Vancouver\'s trusted hub for presales',
            'Early access to upcoming developments',
            'Expert analysis on investment potential',
        ],
    },
    {
        title: 'White-glove client care',
        points: [
            'Curated property evaluations for each client',
            'Tailored acquisition & listing strategies',
            'Seamless start-to-finish management',
        ],
    },
    {
        title: 'Premium marketing & negotiation',
        points: [
            'Deep market intelligence across Greater Vancouver',
            'Master-level negotiation skills',
            'Polished marketing for maximum exposure',
        ],
    },
];

export default function AchievementsSection() {
    return (
        <section className="py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                <div className="mb-16">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label mb-6">Our Uniqueness</span>
                    </ScrollReveal>
                    <WordReveal
                        text="Why Sam Salem is not just another agent — he's your real estate partner"
                        className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-3xl"
                        delay={0.2}
                    />
                </div>

                <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                    {uniquePoints.map((item, index) => (
                        <StaggerItem key={item.title} direction="up">
                            <div className={`py-8 lg:py-0 lg:px-6 ${index > 0 ? 'border-t lg:border-t-0 lg:border-l border-border' : ''
                                }`}>
                                <h3 className="text-lg font-semibold mb-8 leading-snug pr-4">
                                    {item.title}
                                </h3>
                                <div className="mt-auto space-y-4">
                                    {item.points.map((point) => (
                                        <div key={point} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-primary/40 mt-2 shrink-0" />
                                            <p className="text-sm text-muted leading-relaxed">
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
