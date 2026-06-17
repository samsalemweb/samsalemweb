import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

interface Props {
    params: { slug: string };
}

// Pre-generate all published slugs at build time
export async function generateStaticParams() {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) return {};

    return {
        title: post.meta_title || `${post.title} | Sam Salem`,
        description: post.meta_description || post.excerpt || '',

        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt || '',
            images: post.hero_image_url ? [post.hero_image_url] : [],
            type: 'article',
            publishedTime: post.published_at || post.created_at,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) notFound();

    const formattedDate = post.published_at
        ? new Date(post.published_at).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '';

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Image */}
            {post.hero_image_url && (
                <div className="relative h-[40vh] md:h-[50vh]">
                    <Image
                        src={post.hero_image_url}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <div className="max-w-4xl mx-auto">
                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="flex gap-2 flex-wrap mb-3">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block px-3 py-1 bg-accent text-white text-xs font-body font-medium rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <h1 className="text-2xl md:text-4xl font-heading font-semibold text-white mb-2">
                                {post.title}
                            </h1>
                            <p className="text-white/70 font-body text-sm">
                                {formattedDate} · By {post.author}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* No hero image fallback header */}
            {!post.hero_image_url && (
                <div className="bg-primary pt-28 pb-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {post.tags.length > 0 && (
                            <div className="flex gap-2 flex-wrap mb-3">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-block px-3 py-1 bg-accent text-white text-xs font-body font-medium rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <h1 className="text-2xl md:text-4xl font-heading font-semibold text-white mb-2">
                            {post.title}
                        </h1>
                        <p className="text-white/70 font-body text-sm">
                            {formattedDate} · By {post.author}
                        </p>
                    </div>
                </div>
            )}

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <article className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
                    <div
                        className="prose prose-lg max-w-none font-body
                            prose-headings:font-heading prose-headings:text-foreground prose-headings:font-semibold
                            prose-p:text-muted prose-p:leading-relaxed
                            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-foreground
                            prose-li:text-muted"
                        dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
                    />
                </article>

                {/* Share + Back */}
                <div className="flex items-center justify-between mt-10">
                    <Link
                        href="/news/articles"
                        className="inline-flex items-center text-primary font-body font-medium hover:text-accent transition-colors"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        Back to all articles
                    </Link>

                    <div className="flex gap-3">
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://samsalemrealty.ca/news/articles/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm px-4 py-2 border border-gray-200 rounded-full font-body text-muted hover:text-accent hover:border-accent/30 transition-all"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
