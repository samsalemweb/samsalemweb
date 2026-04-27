export default function MarketTrendsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Data & Analytics
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-semibold text-white">
                        North Vancouver market trends
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        Stay updated with the latest real estate data and insights.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Avg. Home Price', value: '$1.85M', change: '+4.2% YoY' },
                        { label: 'Avg. Days on Market', value: '18', change: '-3 days vs last year' },
                        { label: 'Sales-to-List Ratio', value: '102%', change: 'Seller\'s market' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                            <p className="text-3xl font-heading font-semibold text-primary mb-1">{stat.value}</p>
                            <p className="text-foreground font-body text-sm font-medium mb-1">{stat.label}</p>
                            <p className="text-accent font-body text-xs">{stat.change}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Market overview</h2>
                    <p className="text-muted font-body text-base leading-relaxed mb-4">
                        The North Vancouver real estate market continues to show strong activity in 2025, with detached homes seeing steady appreciation driven by limited inventory and sustained demand from families seeking proximity to nature and urban amenities.
                    </p>
                    <p className="text-muted font-body text-base leading-relaxed mb-4">
                        Condos and townhomes remain popular among first-time buyers, with prices in the Lonsdale corridor showing the most competitive dynamics. The presale market is active with several new developments expected to complete in early 2026.
                    </p>
                    <p className="text-muted font-body text-base leading-relaxed">
                        For a personalised market analysis specific to your neighbourhood, contact Sam Salem directly. He provides complimentary CMA reports to help you understand your property&apos;s current value.
                    </p>
                </div>
            </div>
        </div>
    );
}
