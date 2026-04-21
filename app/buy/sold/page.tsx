'use client';

import { motion } from 'framer-motion';

const soldProperties = [
    { src: '/sold (1).jpg', label: 'Sold' },
    { src: '/sold (1).png', label: 'Sold' },
    { src: '/sold (2).jpg', label: 'Sold' },
    { src: '/sold (2).png', label: 'Sold' },
    { src: '/sold (3).jpg', label: 'Sold' },
    { src: '/sold (3).png', label: 'Sold' },
    { src: '/sold (4).jpg', label: 'Sold' },
    { src: '/sold (4).png', label: 'Sold' },
    { src: '/sold (5).jpg', label: 'Sold' },
    { src: '/sold (5).png', label: 'Sold' },
    { src: '/sold (6).png', label: 'Sold' },
    { src: '/sold (7).png', label: 'Sold' },
    { src: '/sold (8).png', label: 'Sold' },
    { src: '/sold (9).png', label: 'Sold' },
    { src: '/sold (10).png', label: 'Sold' },
    { src: '/sold (11).png', label: 'Sold' },
    { src: '/sold (12).png', label: 'Sold' },
    { src: '/sold (13).png', label: 'Sold' },
    { src: '/sold (14).png', label: 'Sold' },
    { src: '/sold (15).png', label: 'Sold' },
];

export default function SoldPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Sold by Salem
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Recently sold properties
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        A selection of properties successfully sold by Sam Salem across Greater Vancouver.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <p className="text-muted font-body text-sm mb-6">
                    {soldProperties.length} properties sold
                </p>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {soldProperties.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-30px' }}
                                    transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4) }}
                                    className="relative break-inside-avoid rounded-2xl overflow-hidden group"
                                >
                                    <img
                                        src={item.src}
                                        alt={`Sold Property ${idx + 1}`}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                                        loading={idx < 6 ? 'eager' : 'lazy'}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                                            Sold
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
            </div>
        </div>
    );
}
