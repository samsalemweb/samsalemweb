import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import areasData from '@/lib/data/areas.json';
import { Area } from '@/lib/types';

export default function AreasPage() {
    const areas = areasData as Area[];

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        North Vancouver & Beyond
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-semibold text-white">
                        Areas we serve
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        Explore the diverse neighbourhoods Sam Salem specialises in across the North Shore.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areas.map((area) => (
                        <Link
                            key={area.slug}
                            href={`/areas/${area.slug}`}
                            className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image src={area.image} alt={area.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-5">
                                <h2 className="text-lg font-heading font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">{area.name}</h2>
                                <p className="text-accent font-body text-sm font-medium mb-2">Avg. {formatPrice(area.avgPrice)}</p>
                                <p className="text-muted font-body text-sm line-clamp-2 leading-relaxed">{area.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
