'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';
import Image from 'next/image';
import Link from 'next/link';

const specialties = [
    'Presales', 'Condominiums', 'Luxury Homes', 'Residential Single Family', 'Multi-family / Investment', 'Commercial', 'Vacant Land'
];

const areas = [
    'Burnaby', 'Coquitlam', 'Maple Ridge', 'New Westminster', 'North Vancouver', 'Pitt Meadows', 'Port Coquitlam', 'Port Moody', 'Vancouver', 'West Vancouver'
];

const values = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
        ),
        title: 'Wide Property Selection',
        description: 'Diverse residential and commercial listings across Greater Vancouver — from presales to luxury homes.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
        title: 'Market Expertise',
        description: 'Data-driven insights and 20+ years of local knowledge to guide every buying and selling decision.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        title: 'Hassle-Free Transactions',
        description: 'Smooth processes from evaluation to closing — we handle every detail so you don\'t have to.',
    },
];

const processSteps = [
    {
        number: '01',
        title: 'Initial Consultation',
        description: 'We begin by understanding your goals, needs, and preferences to tailor our approach to your specific real estate journey.',
    },
    {
        number: '02',
        title: 'Market Analysis & Strategy',
        description: 'We provide a comprehensive market analysis to help you understand current trends and make informed decisions.',
    },
    {
        number: '03',
        title: 'Property Search or Listing',
        description: 'We assist in finding the perfect property or crafting a marketing strategy to showcase yours to the right buyers.',
    },
    {
        number: '04',
        title: 'Home Preparation & Staging',
        description: 'We enhance your property\'s appeal with professional staging and improvements, maximizing its value for potential buyers.',
    },
    {
        number: '05',
        title: 'Negotiation & Closing',
        description: 'Sam handles negotiations with master-level skill, ensuring the best deal and supporting you through a seamless closing process.',
    },
    {
        number: '06',
        title: 'Post-Sale Support',
        description: 'Even after closing, we\'re here to assist with your next steps. Your satisfaction is our long-term priority.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Hero Section — Clean split layout inspired by realest.framer.website */}
            <div className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 md:gap-16">
                        {/* Left — Badge + Heading */}
                        <div>
                            <ScrollReveal direction="up" delay={0.1}>
                                <motion.div
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/8 border border-primary/15 mb-8"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="text-primary font-body font-semibold text-xs tracking-[0.15em] uppercase">
                                        About
                                    </span>
                                </motion.div>
                            </ScrollReveal>

                            <WordReveal
                                text="Redefining the way you experience real estate"
                                className="text-4xl md:text-6xl lg:text-[4.5rem] font-heading font-medium tracking-tight text-foreground leading-[1.05]"
                                delay={0.2}
                            />
                        </div>

                        {/* Right — Subtitle */}
                        <div className="md:pb-2">
                            <ScrollReveal direction="up" delay={0.5} blur>
                                <p className="text-muted font-body text-lg md:text-xl leading-relaxed">
                                    Sam Salem is committed to making real estate transactions effortless — with 20+ years of experience across luxury homes, presales, and commercial properties internationally.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 opacity-40" />
            </div>

            {/* Hero Image */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <Image
                        src="/samsalempicture.jpg"
                        alt="Sam Salem - Top 1% Realtor"
                        width={900}
                        height={1100}
                        className="w-full h-[500px] md:h-[700px] lg:h-[800px] object-cover object-top"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <h2 className="text-2xl md:text-4xl font-heading font-medium text-white mb-2">
                            From coffee to keys.
                        </h2>
                        <p className="text-white/80 font-body text-base md:text-lg max-w-md">
                            Exceptional service centered on precision, strategy, and white-glove client care.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Values Grid — 3 columns with icons, inspired by reference */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#f5f5f3] rounded-3xl p-10 md:p-16"
                    >
                        <StaggerContainer stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                            {values.map((value, i) => (
                                <StaggerItem key={i} direction="up">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-14 h-14 mb-6 text-foreground">
                                            {value.icon}
                                        </div>
                                        <h3 className="text-xl font-heading font-medium text-foreground mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-muted font-body text-[15px] leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </motion.div>
                </div>
            </section>

            {/* Main Content — Bento Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Stats/Badge Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:col-span-5 bg-primary rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                        </div>
                        <div>
                            <span className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-2 block">Achievement</span>
                            <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-4">Medallion Club 2023</h3>
                            <p className="text-white/70 font-body text-base leading-relaxed">
                                Recognized the top 10% of REALTORS® in Greater Vancouver, based on exceptional sales performance and professional excellence
                            </p>
                            <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-4">President Club 2023</h3>
                            <p className="text-white/70 font-body text-base leading-relaxed">
                                Recognized among the elite Top 1% of all REALTORS® in Greater Vancouver for outstanding sales achievement and client dedication.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="text-5xl font-heading font-semibold text-accent mb-2">20+</div>
                            <div className="text-white/80 font-body text-sm font-medium tracking-wide uppercase">Years of Luxury & Commercial Experience</div>
                        </div>
                    </motion.div>

                    {/* Bio Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm"
                    >
                        <h3 className="text-2xl font-heading font-medium text-foreground mb-8">The Professional Journey</h3>
                        <div className="space-y-6 text-muted font-body text-[17px] leading-relaxed">
                            <p>
                                I recognize that selling or buying a home is one of the most important decisions you&apos;ll make in your life. Your home may be your largest asset and as such, this could be the biggest financial move you&apos;ve ever made. I believe you deserve the best representation when dealing with such a large-scale investment.
                            </p>
                            <p>
                                Originally born in Iran, I hold a Master&apos;s degree in Civil Engineering. This structural and analytical background perfectly complements my 20+ years of active experience as a realtor dealing in Luxury Homes and Commercial properties across Tehran and Vancouver.
                            </p>
                            <p>
                                My real estate acumen, combined with master-level negotiation skills and a thorough knowledge of the local Vancouver market, enables me to offer you the highest caliber of advocacy. I listen closely to trace my clients&apos; true desires into an effective, practical system designed to achieve their unique goals.
                            </p>
                            <p className="text-foreground font-medium italic">
                                &quot;My sharp analytical ability is balanced with a warm sense of humour and a down-to-earth approach. If you&apos;re selling, count on me to get your home sold quickly, and for top dollar.&quot;
                            </p>
                        </div>
                    </motion.div>


                    {/* Information Grids */}
                    <div className="md:col-span-6 grid grid-cols-1 gap-6">
                        {/* Specialties */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-cream/50 rounded-3xl p-8 border border-border"
                        >
                            <h3 className="text-lg font-heading font-medium text-foreground mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </span>
                                Core Specialties
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {specialties.map((spec) => (
                                    <span key={spec} className="px-4 py-2 bg-white rounded-full text-xs font-semibold tracking-wide text-foreground border border-border shadow-sm">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:col-span-6 grid grid-cols-1 gap-6">
                        {/* Service Areas */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-primary/5 rounded-3xl p-8 border border-border"
                        >
                            <h3 className="text-lg font-heading font-medium text-foreground mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                Areas of Expertise
                            </h3>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                {areas.map((area) => (
                                    <div key={area} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                        <span className="text-sm font-body text-muted">{area}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Process Section — Inspired by realest.framer.website "A Smooth & Stress-Free Journey" */}
            <section className="py-20 md:py-28 bg-[#f5f5f3]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-14">
                        <ScrollReveal direction="up" delay={0.1}>
                            <motion.div
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/8 border border-primary/15 mb-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-primary font-body font-semibold text-xs tracking-[0.15em] uppercase">
                                    Process
                                </span>
                            </motion.div>
                        </ScrollReveal>
                        <WordReveal
                            text="A smooth and stress-free journey"
                            className="text-3xl md:text-5xl lg:text-[3.5rem] font-heading font-medium tracking-tight text-foreground leading-tight max-w-2xl"
                            delay={0.2}
                        />
                        <ScrollReveal direction="up" delay={0.4} blur>
                            <p className="text-muted font-body text-lg mt-4 max-w-xl">
                                We handle every detail with care and expertise from beginning to end.
                            </p>
                        </ScrollReveal>
                    </div>

                    <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processSteps.map((step, i) => (
                            <StaggerItem key={i} direction="up">
                                <motion.div
                                    className="bg-white rounded-2xl p-8 border border-border h-full group transition-shadow duration-300 hover:shadow-lg"
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <div className="text-3xl font-heading font-semibold text-accent/30 mb-4 group-hover:text-accent transition-colors duration-300">
                                        {step.number}
                                    </div>
                                    <h4 className="text-lg font-heading font-medium text-foreground mb-3">
                                        {step.title}
                                    </h4>
                                    <p className="text-muted font-body text-[15px] leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Sold by Salem */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <ScrollReveal direction="up" delay={0.1}>
                            <motion.div
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-accent font-body font-semibold text-xs tracking-[0.15em] uppercase">
                                    Portfolio
                                </span>
                            </motion.div>
                        </ScrollReveal>
                        <h3 className="text-3xl md:text-5xl font-heading font-medium text-foreground mb-3">Sold by Sam</h3>
                        <p className="text-muted font-body text-lg max-w-lg">A selection of properties successfully sold by Sam Salem across Greater Vancouver.</p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { src: '/sold (1).jpg', label: 'Sold' },
                            { src: '/sold (2).jpg', label: 'Sold' },
                            { src: '/sold (3).jpg', label: 'Sold' },
                            { src: '/sold (4).jpg', label: 'Sold' },
                            { src: '/sold (5).jpg', label: 'Sold' },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative h-[220px] md:h-[260px] rounded-2xl overflow-hidden group"
                            >
                                <Image
                                    src={item.src}
                                    alt={`Sold Property ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3">
                                    <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                                        {item.label}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Info Bar — Bottom of page */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-cream/50 rounded-3xl p-6 md:p-8 border border-border flex flex-col md:flex-row items-center justify-between gap-4"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold tracking-widest uppercase text-muted">Office</div>
                                    <div className="text-sm font-body text-foreground font-medium">1546 Marine Drive, West Vancouver BC</div>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-border" />
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold tracking-widest uppercase text-muted">Brokerage</div>
                                    <div className="text-sm font-body text-foreground font-medium">Sincere Real Estate Services</div>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-border" />
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold tracking-widest uppercase text-muted">Designation</div>
                                    <div className="text-sm font-body text-foreground font-medium">Personal Real Estate Corporation (PREC)</div>
                                </div>
                            </div>
                        </div>
                        <Link href="/contact" className="btn-pill btn-pill-dark whitespace-nowrap">
                            Get in Touch
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
