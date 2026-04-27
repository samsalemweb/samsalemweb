'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';

const GOOGLE_REVIEWS_URL =
    'https://www.google.com/search?sca_esv=d8d50d93fddf83e5&sxsrf=ANbL-n6-vo7VeQ4RQibxu4yjeA1uNLWApw:1773156825616&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZYkmS4TKTvg-i3dtzn8LkbaQFwOAaNtauNQNOHgxJD92Fx-CjHQmaQm-AKViCpC2jgVhKKL9Ohv9tNIe2IgoFc6qlDwjfbchrp0FoCQRZ33v-VKkoM0OCK-Xc_DdrZMIVgCnxo%3D&q=Sam+Salem+Personal+Real+Estate+Corporation+Reviews&sa=X&ved=2ahUKEwiE4eL105WTAxXnhGMGHe2oJa0Q0bkNegQISRAH&biw=1512&bih=857&dpr=2';

const reviews = [
    {
        name: 'Dina Soroush',
        time: '5 months ago',
        text: 'Working with Sam was an absolute pleasure! From start to finish, he made the home-buying process smooth and stress-free. He really takes the time to understand your needs and priorities, and his advice is always thoughtful and practical. Sam connected us with trusted professionals—like a mortgage broker, lawyer, and home inspector—which made everything much easier. He\'s approachable, responsive, and genuinely committed to helping his clients.',
    },
    {
        name: 'Mohammad Dashti',
        time: '4 months ago',
        text: 'It was a very easy and smooth experience with Sam to buy our dream house. It was our third house in Canada, but it was the first time that we stayed back and Sam actually found this house (based on our criteria) and quickly setup a showing before anyone else and even before the first open-house. Basically, he\'d put us in front of the line. He was really helpful and made the whole process REALLY REALLY easy for us.',
    },
    {
        name: 'Meghdad Zangi',
        time: '5 months ago',
        text: 'Sam is one of the most professional and reliable realtors I\'ve ever worked with. He\'s extremely detail-oriented, honest, and truly cares about his clients. From the first meeting to closing the deal, everything was handled smoothly and professionally. Highly recommended! 👏🏡',
    },
    {
        name: 'Lexeon Law',
        time: '7 months ago',
        text: 'We\'ve had the pleasure of working with Sam on several real estate transactions, and he consistently impresses us with his professionalism, responsiveness, and care for his clients. Sam is thorough, easy to communicate with, and always goes the extra mile to ensure that every deal closes smoothly.',
    },
    {
        name: 'Ehsan Sadeghi',
        time: '7 months ago',
        text: 'I highly recommend Sam if you\'re planning to buy a home anywhere in the Greater Vancouver area. He\'s an expert who can guide and support you through the often challenging process of buying a house. Sam has strong connections and was able to match us with the right mortgage broker, lawyer, and home inspector—saving us time and effort.',
    },
    {
        name: 'Majid Ranjbar',
        time: '11 months ago',
        text: 'I had the absolute pleasure of working with Sam Salem to purchase my new home, and I can confidently say he\'s one of the best in the business. From day one, Sam was professional, knowledgeable, and completely dedicated to helping me find the perfect place. His negotiation skills are top-notch, and he made the entire experience smooth and stress-free.',
    },
    {
        name: 'Amir Sajadipour',
        time: '3 months ago',
        text: 'I highly recommend working with Mr. Sam Salem. He is full of positive energy, has strong information and connections, and he always follows up to solve any potential problems. I sincerely thank him.',
    },
];

function StarRating() {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
    return (
        <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[340px] md:w-[400px] bg-white rounded-2xl border border-[#C9A84C]/15 p-6 hover:border-[#C9A84C]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A84C]/5 group cursor-pointer"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#B89A3E] flex items-center justify-center text-white font-cinzel font-semibold text-sm">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-semibold text-sm text-[#1a1a1a]">{review.name}</h4>
                    <p className="text-xs text-muted">{review.time}</p>
                </div>
                <div className="ml-auto">
                    <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                </div>
            </div>
            <StarRating />
            <p className="mt-3 text-sm text-[#1a1a1a]/70 leading-relaxed line-clamp-4 group-hover:text-[#1a1a1a]/90 transition-colors">
                {review.text}
            </p>
        </Link>
    );
}

export default function GoogleReviewsSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimationControls();
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate reviews for seamless infinite scroll
    const allReviews = [...reviews, ...reviews];

    useEffect(() => {
        const startAnimation = async () => {
            await controls.start({
                x: [0, -(reviews.length * 416)],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: reviews.length * 6,
                        ease: 'linear',
                    },
                },
            });
        };

        if (!isPaused) {
            startAnimation();
        } else {
            controls.stop();
        }
    }, [isPaused, controls]);

    return (
        <section className="py-16 md:py-24 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <ScrollReveal direction="up">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                        <div>
                            <span className="section-label mb-4">Google Reviews</span>
                            <h2 className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight mt-4">
                                What Our Clients Say
                            </h2>
                        </div>
                        <Link
                            href={GOOGLE_REVIEWS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-luxury text-xs"
                        >
                            View All Reviews
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </ScrollReveal>
            </div>

            {/* Sliding reviews */}
            <div
                ref={containerRef}
                className="relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-4 pl-4"
                    animate={controls}
                >
                    {allReviews.map((review, i) => (
                        <ReviewCard key={`${review.name}-${i}`} review={review} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
