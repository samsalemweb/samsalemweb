'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';
import { MagneticButton } from '@/components/animations/HoverCard';

const faqs = [
    {
        q: 'How do I know the listings are real and up to date?',
        a: 'Every listing on our site is personally verified by Sam Salem. We only feature properties that are currently available and actively on the market, ensuring you never waste time on outdated information.',
    },
    {
        q: 'Do I have to pay to browse properties on your site?',
        a: 'Absolutely not. Browsing is completely free. Sam Salem earns his commission only when a successful transaction is completed — there are no hidden fees for buyers.',
    },
    {
        q: 'Can you help me sell my current home?',
        a: 'Yes! Sam Salem specializes in both buying and selling. From professional staging advice to pricing strategy and marketing, he handles the entire process to get you the best possible price.',
    },
    {
        q: "What's the process for booking a home tour?",
        a: "Simply click 'Contact Sam' on any listing or use the contact form. Sam Salem typically responds within the hour and can arrange viewings at your convenience, including evenings and weekends.",
    },
    {
        q: 'What areas does Sam Salem cover?',
        a: 'Sam Salem serves buyers and sellers across Greater Vancouver including Burnaby, Coquitlam, Maple Ridge, New Westminster, North Vancouver, Pitt Meadows, Port Coquitlam, Port Moody, Vancouver, and West Vancouver.',
    },
    {
        q: 'How much commission do you charge?',
        a: 'Commission rates are competitive and transparent. Sam Salem will discuss all fees upfront during your initial consultation — no surprises, no hidden costs.',
    },
];

export default function ContactCTA() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

    return (
        <section className="py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                <div className="mb-16">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label mb-6">FAQs</span>
                    </ScrollReveal>
                    <WordReveal
                        text="Everything you wanted to ask (but didn't know who to)"
                        className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-2xl"
                        delay={0.2}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form - slides in from left */}
                    <ScrollReveal direction="left" delay={0.2}>
                        <div className="bg-cream/60 rounded-3xl p-8 md:p-10 border border-border">
                            <h3 className="text-xl md:text-2xl font-medium mb-2 leading-snug">
                                We&apos;re just a form away — send us your question, and we&apos;ll be happy to help!
                            </h3>

                            <form className="mt-8 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Jane Smith"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/60 border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 placeholder:text-muted/40 transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="(604) 555-1234"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/60 border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 placeholder:text-muted/40 transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        placeholder="jane@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/60 border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 placeholder:text-muted/40 transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Write your message here"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/60 border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 placeholder:text-muted/40 resize-none transition-all duration-300 focus:shadow-lg focus:shadow-accent/5"
                                    />
                                </div>
                                <MagneticButton className="w-full">
                                    <button type="submit" className="btn-pill btn-pill-dark w-full justify-center">
                                        Send Message
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </MagneticButton>
                            </form>
                        </div>
                    </ScrollReveal>

                    {/* FAQ Accordion - slides in from right */}
                    <ScrollReveal direction="right" delay={0.3}>
                        <div>
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-border">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center gap-4 py-5 text-left group"
                                    >
                                        <motion.div
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === index
                                                ? 'bg-primary border-primary text-white'
                                                : 'border-border text-muted group-hover:border-primary'
                                                }`}
                                            animate={{ rotate: openFaq === index ? 45 : 0 }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </motion.div>
                                        <span className="text-[15px] font-medium leading-snug pr-4">
                                            {faq.q}
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pl-14 text-sm text-muted leading-relaxed pr-4 pb-5">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
