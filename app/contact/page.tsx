import { ContactForm } from '@/components/contact/page';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Get in Touch
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-semibold text-white">
                        Contact Sam Salem
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        Have a question or ready to start your real estate journey? Reach out today.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Send a message</h2>
                        <ContactForm />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-6">Contact Information</h3>
                            <div className="space-y-5">
                                {[
                                    { icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z', label: 'Phone', value: '+1 (604) 445-2030', href: 'tel:+16044452030' },
                                    { icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75', label: 'Email', value: 'salemhomes@yahoo.com', href: 'mailto:salemhomes@yahoo.com' },
                                    { icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z', label: 'Office', value: '1546 Marine Drive West Vancouver' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted font-body uppercase tracking-wide">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} className="text-foreground font-body text-sm font-medium hover:text-accent transition-colors">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-foreground font-body text-sm font-medium">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Book a Meeting */}
                        <div className="bg-primary rounded-2xl p-8 text-center">
                            <h3 className="text-lg font-heading font-semibold text-white mb-2">Book a Meeting</h3>
                            <p className="text-white/70 font-body text-sm mb-4">
                                Schedule a 60-minute consultation to discuss your real estate needs.
                            </p>
                            <a
                                href="https://calendly.com/samsalemhomes/60min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-3 bg-accent text-white font-body font-semibold rounded-full hover:bg-accent-dark transition-all duration-300"
                            >
                                Book Now
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Connect</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Instagram', href: 'https://www.instagram.com/samsalemrealtor/' },
                                    { label: 'Facebook', href: 'https://www.facebook.com/SamSalemRealty/' },
                                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sam-salem-realtor-445344138/' },
                                    { label: 'YouTube', href: 'https://www.youtube.com/@samsalemrealtor' },
                                    { label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=16044452030' },
                                    { label: 'Telegram', href: 'https://t.me/samsalemrealtor' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-100 text-sm font-body text-muted hover:text-accent hover:border-accent/20 transition-all"
                                    >
                                        {social.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
