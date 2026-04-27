'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { WordReveal } from '@/components/animations/TextReveal';
import HoverCard from '@/components/animations/HoverCard';

interface LatestNewsClientProps {
    posts: BlogPost[];
}

export default function LatestNewsClient({ posts }: LatestNewsClientProps) {
    return (
        <section className="py-16 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="none" blur>
                    <div className="section-divider mb-16" />
                </ScrollReveal>

                <div className="mb-16">
                    <ScrollReveal direction="up" delay={0.1}>
                        <span className="section-label mb-6">News and Articles</span>
                    </ScrollReveal>
                    <WordReveal
                        text="Stay informed with the latest market insights"
                        className="text-3xl md:text-4xl font-cinzel font-semibold leading-tight tracking-tight max-w-2xl"
                        delay={0.2}
                    />
                </div>

                <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <StaggerItem key={post.slug} direction="up">
                            <HoverCard lift={-6} scaleAmount={1.02}>
                                <Link href={`/news/articles/${post.slug}`} className="group block">
                                    <div className="relative rounded-2xl overflow-hidden aspect-[3/2] mb-5">
                                        {post.hero_image_url ? (
                                            <Image
                                                src={post.hero_image_url}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-cream" />
                                        )}
                                    </div>
                                    {post.tags?.[0] && (
                                        <span className="tag-badge tag-sale mb-3">
                                            {post.tags[0]}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-medium text-primary group-hover:text-accent transition-colors leading-snug mt-3">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-sm text-muted mt-2 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </Link>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
