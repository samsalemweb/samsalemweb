'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

const navLinks = [
    { label: 'Home', href: '/' },
    {
        label: 'Listings',
        href: '/buy/samslisting',
        children: [
            { label: "Sam's Listings", href: '/buy/samslisting' },
            { label: 'Presale Properties', href: '/presale' },
            { label: 'Office Listing', href: '/listing/office-listing' },
            { label: 'Assignment', href: '/listing/assignment' },
        ],
    },
    { label: 'Sold', href: '/buy/sold' },
    { label: 'About', href: '/about' },
    {
        label: 'Tools',
        href: '/tools',
        children: [
            { label: 'Payment Calculator', href: '/tools/payment-calculator' },
            { label: 'Refinance Calculator', href: '/tools/refinance-calculator' },
            { label: 'Land Transfer Tax', href: '/tools/land-transfer-tax' },
            { label: 'Affordability Calculator', href: '/tools/affordability-calculator' },
        ],
    },
    {
        label: 'Areas We Serve',
        href: '/areas',
        children: [
            { label: 'Burnaby', href: '/areas/burnaby' },
            { label: 'Coquitlam', href: '/areas/coquitlam' },
            { label: 'Maple Ridge', href: '/areas/maple-ridge' },
            { label: 'New Westminster', href: '/areas/new-westminster' },
            { label: 'North Vancouver', href: '/areas/north-vancouver' },
            { label: 'Pitt Meadows', href: '/areas/pitt-meadows' },
            { label: 'Port Coquitlam', href: '/areas/port-coquitlam' },
            { label: 'Port Moody', href: '/areas/port-moody' },
            { label: 'Vancouver', href: '/areas/vancouver' },
            { label: 'West Vancouver', href: '/areas/west-vancouver' },
        ],
    },
    {
        label: 'News',
        href: '/news/articles',
        children: [
            { label: 'Market Trends', href: '/news/market-trends' },
            { label: 'Articles', href: '/news/articles' },
        ],
    },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClick = () => setActiveDropdown(null);
        if (activeDropdown) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [activeDropdown]);

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
                <div
                    className={`max-w-7xl mx-auto flex items-center justify-between h-14 px-6 rounded-full border transition-all duration-500 ${scrolled
                        ? 'bg-cream/90 backdrop-blur-xl border-[#C9A84C]/30 shadow-lg'
                        : 'bg-cream/70 backdrop-blur-md border-[#C9A84C]/20'
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center group shrink-0">
                        <motion.div
                            className="flex items-baseline"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <Image
                                src="/samsalemlogo.PNG"
                                alt="Sam Salem Logo"
                                width={160}
                                height={50}
                                className="h-24 w-auto object-contain"
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() =>
                                    link.children && setActiveDropdown(link.label)
                                }
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="px-4 py-2 text-[13px] font-medium text-primary/80 hover:text-[#C9A84C] tracking-wide uppercase transition-colors duration-200"
                                >
                                    <span className="flex items-center gap-1">
                                        {link.label}
                                        {link.children && (
                                            <motion.svg
                                                className="w-3 h-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </motion.svg>
                                        )}
                                    </span>
                                </Link>

                                {/* Animated dropdown */}
                                <AnimatePresence>
                                    {link.children && activeDropdown === link.label && (
                                        <motion.div
                                            className="absolute top-full left-0 pt-3"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                        >
                                            <div className="bg-cream/95 backdrop-blur-xl rounded-2xl border border-border shadow-xl py-2 min-w-[220px]">
                                                {link.children.map((child, i) => (
                                                    <motion.div
                                                        key={child.href}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05, duration: 0.2 }}
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            className="block px-5 py-3 text-sm text-primary/70 hover:text-[#C9A84C] hover:bg-primary/5 transition-all duration-200"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* CTA, Socials + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Social Icons (Desktop Only) */}
                        <div className="hidden lg:flex items-center gap-2 mr-2 border-r border-[#C9A84C]/20 pr-4">
                            {[
                                { href: 'https://www.instagram.com/samsalemrealtor/', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                                { href: 'https://www.facebook.com/SamSalemRealty/', label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                                { href: 'https://www.linkedin.com/in/sam-salem-realtor-445344138/', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                                { href: 'https://www.youtube.com/@samsalemrealtor', label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary/60 hover:text-[#C9A84C] transition-colors p-1"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1, y: -1 }}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.path} /></svg>
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden lg:block"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white text-xs font-cinzel font-semibold tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-[#B89A3E] hover:shadow-lg hover:shadow-[#C9A84C]/30"
                            >
                                Contact Sam
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </motion.div>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <motion.span
                                    className="block h-0.5 w-5 bg-[#C9A84C] rounded-full"
                                    animate={{
                                        rotate: mobileOpen ? 45 : 0,
                                        y: mobileOpen ? 7 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.span
                                    className="block h-0.5 w-5 bg-[#C9A84C] rounded-full"
                                    animate={{ opacity: mobileOpen ? 0 : 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    className="block h-0.5 w-5 bg-[#C9A84C] rounded-full"
                                    animate={{
                                        rotate: mobileOpen ? -45 : 0,
                                        y: mobileOpen ? -7 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            <MobileMenu
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                navLinks={navLinks}
            />

            {/* Spacer */}
            <div className="h-20" />
        </>
    );
}
