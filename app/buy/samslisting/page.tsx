export const revalidate = 3600;

export const metadata = {
    title: "Sam Salem's Current Listings | Sam Salem | PREC",
    description:
        "Browse Sam Salem's active MLS listings in Greater Vancouver. Luxury condos, townhomes, and detached homes.",
};

export default function SamSalemsListingPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-primary" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-background" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 font-body" style={{ color: '#C9A84C' }}>
                        Active Listings
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-medium text-white mb-6 tracking-tight">
                        Sam Salem&apos;s Greater Vancouver Real Estate Listings
                    </h1>
                    <div className="w-24 h-[2px] mx-auto" style={{ backgroundColor: '#C9A84C' }} />
                </div>
            </div>

            {/* Maintenance Notice */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="rounded-2xl border border-border bg-white text-center px-6 py-14 md:px-12 md:py-16 shadow-[0_0_20px_rgba(201,168,76,0.1)]">
                    <div
                        className="w-14 h-14 mx-auto mb-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(201, 168, 76, 0.12)' }}
                    >
                        <svg
                            className="w-7 h-7"
                            style={{ color: '#C9A84C' }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-cinzel font-medium text-foreground mb-4">
                        This Page Is Under Maintenance
                    </h2>

                    <p className="text-muted font-body text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                        We are currently updating our listings to serve you better.
                        In the meantime, please reach out by email for all inquiries,
                        and Sam will be happy to assist you personally.
                    </p>

                    <a
                        href="mailto:salemhomes@yahoo.com"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold font-body text-white transition-all duration-300 hover:opacity-90 hover:gap-4"
                        style={{ backgroundColor: '#C9A84C' }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                        </svg>
                        salemhomes@yahoo.com
                    </a>

                    <p className="text-sm text-muted font-body mt-8">
                        Thank you for your patience. We will be back soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
