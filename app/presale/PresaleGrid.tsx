'use client';

import { useState, useMemo } from 'react';
import type { PresaleWithImages } from '@/types/presale';
import PresaleCard from '@/components/presale/PresaleCard';

interface PresaleGridProps {
    listings: PresaleWithImages[];
}

const statusOptions = ['Selling', 'Registration', 'Coming Soon'];

export default function PresaleGrid({ listings }: PresaleGridProps) {
    const [cityFilter, setCityFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Extract unique cities and property types from actual data
    const cities = useMemo(() => {
        const unique = Array.from(new Set(listings.map((l) => l.city).filter(Boolean)));
        return unique.sort();
    }, [listings]);

    const propertyTypes = useMemo(() => {
        const unique = Array.from(new Set(listings.map((l) => l.property_type).filter(Boolean)));
        return unique.sort();
    }, [listings]);

    const filtered = useMemo(() => {
        return listings.filter((l) => {
            if (cityFilter && l.city !== cityFilter) return false;
            if (typeFilter && l.property_type !== typeFilter) return false;
            if (statusFilter && l.listing_status !== statusFilter) return false;
            return true;
        });
    }, [listings, cityFilter, typeFilter, statusFilter]);

    return (
        <div>
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-10 p-5 bg-white rounded-2xl border border-border shadow-sm">
                <div className="flex-1 min-w-[160px]">
                    <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">City</label>
                    <select
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 transition-all"
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[160px]">
                    <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">Property Type</label>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 transition-all"
                    >
                        <option value="">All Types</option>
                        {propertyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[160px]">
                    <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 transition-all"
                    >
                        <option value="">All Statuses</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-end pt-6">
                    <span className="text-sm text-muted font-medium">
                        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} found
                    </span>
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <svg className="w-16 h-16 text-muted/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <p className="text-muted font-body text-base">No projects match your filters.</p>
                    <button
                        onClick={() => { setCityFilter(''); setTypeFilter(''); setStatusFilter(''); }}
                        className="mt-4 text-accent text-sm font-semibold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((listing) => (
                        <PresaleCard key={listing.id} listing={listing} />
                    ))}
                </div>
            )}
        </div>
    );
}
