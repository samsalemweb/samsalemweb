import Link from 'next/link';

export default function SellPage() {
    const services = [
        { title: 'Professional Photography & Video', description: 'HDR photos, drone footage, and 3D virtual tours to showcase your property at its best.' },
        { title: 'Strategic Pricing Analysis', description: 'Data-driven CMA to price your home competitively for maximum return.' },
        { title: 'Targeted Marketing', description: 'Social media campaigns, email blasts to buyer networks, and premium listing placement.' },
        { title: 'Open Houses & Private Showings', description: 'Professionally staged and hosted events to attract qualified buyers.' },
        { title: 'Expert Negotiation', description: 'Sam Salem personally handles all offers to get you the best possible outcome.' },
        { title: 'Full Transaction Management', description: 'From listing to closing, every detail is handled so you can focus on your next move.' },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Sell with Sam Salem
                    </p>
                    <h1 className="text-3xl md:text-5xl font-heading font-semibold text-white mb-4">
                        Sell your home for top dollar
                    </h1>
                    <p className="text-white/70 font-body text-lg max-w-2xl mx-auto">
                        As a top 1% Vancouver realtor, Sam Salem delivers a premium selling experience that maximises your property&apos;s value.
                    </p>
                </div>
            </div>

            {/* Services */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-accent/20 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                            <p className="text-muted font-body text-sm leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-primary rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4">
                        Ready to list your property?
                    </h2>
                    <p className="text-white/70 font-body text-base mb-8 max-w-xl mx-auto">
                        Get a free, no-obligation home evaluation and learn how Sam Salem can sell your home faster and for more.
                    </p>
                    <Link
                        href="/sell/request-sale"
                        className="inline-block px-8 py-4 bg-accent text-white font-body font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 shadow-lg"
                    >
                        Request a Free Valuation
                    </Link>
                </div>
            </div>
        </div>
    );
}
