import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    const statusColors: Record<string, string> = {
        'For Sale': 'bg-accent text-white',
        Sold: 'bg-red-500 text-white',
        Presale: 'bg-primary text-white',
    };

    return (
        <Link
            href={`/buy/samslisting/${listing.id}`}
            className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300 block"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span
                        className={`px-3 py-1 text-xs font-body font-semibold rounded-full ${statusColors[listing.status] || 'bg-gray-500 text-white'
                            }`}
                    >
                        {listing.status}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-body font-medium rounded-full">
                        {listing.propertyType}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <p className="text-xl font-heading font-semibold text-primary mb-1">
                    {formatPrice(listing.price)}
                </p>
                <p className="text-foreground font-body text-sm font-medium mb-1 line-clamp-1">
                    {listing.address}
                </p>
                <p className="text-muted font-body text-xs mb-3">{listing.area}</p>

                <div className="flex items-center gap-4 text-muted font-body text-xs pt-3 border-t border-gray-50">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        {listing.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {listing.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        {listing.sqft} sqft
                    </span>
                </div>
            </div>
        </Link>
    );
}
