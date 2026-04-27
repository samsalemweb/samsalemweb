export default function RequestSalePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Free Home Valuation
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-semibold text-white">
                        Get your free home evaluation
                    </h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-body font-medium text-foreground mb-1.5">First Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-background border border-gray-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-background border border-gray-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" placeholder="Doe" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email</label>
                            <input type="email" className="w-full px-4 py-3 bg-background border border-gray-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Phone</label>
                            <input type="tel" className="w-full px-4 py-3 bg-background border border-gray-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" placeholder="(604) 555-0000" />
                        </div>
                        <div>
                            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Property Address</label>
                            <input type="text" className="w-full px-4 py-3 bg-background border border-gray-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" placeholder="123 Main St, North Vancouver, BC" />
                        </div>
                        <div>
                            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Additional Notes</label>
                            <textarea rows={4} className="w-full px-4 py-3 bg-background border border-gray-200 rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none" placeholder="Tell us about your property..." />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-8 py-4 bg-accent text-white font-body font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 shadow-lg"
                        >
                            Request Free Valuation
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
