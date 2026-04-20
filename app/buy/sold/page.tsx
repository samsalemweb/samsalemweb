'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const soldProperties = [
    { src: '/sold13.png', label: 'Sold' },
    { src: '/sold14.png', label: 'Sold' },
    { src: '/sold15.png', label: 'Sold' },
    { src: '/sold16.png', label: 'Sold' },
    { src: '/sold17.png', label: 'Sold' },
    { src: '/sold12.jpg', label: 'Sold' },
    { src: '/sold8.jpg', label: 'Sold' },
    { src: '/sold9.jpg', label: 'Sold' },
    { src: '/sold10.jpg', label: 'Sold' },
    { src: '/sold11.jpg', label: 'Sold' },

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {soldProperties.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative h-[300px] md:h-[340px] rounded-2xl overflow-hidden group"
                        >
                            <Image
                                src={item.src}
                                alt={`Sold Property ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                                    {item.label}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
