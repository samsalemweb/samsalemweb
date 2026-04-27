import { getAllBlogPosts } from '@/lib/supabase';
import { BlogPost } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export const metadata = {
    title: 'Real Estate Articles and Market Insights | Sam Salem',
    description:
        'Read the latest North Vancouver real estate market updates, buying tips, and neighbourhood guides from Sam Salem.',
};

export default async function ArticlesPage() {
    const posts = await getAllBlogPosts();

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Stay Informed
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-semibold text-white">
                        Articles &amp; market insights
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        Market trends, buying tips, and neighbourhood guides for North Vancouver.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {posts.length === 0 ? (
                    <p className="text-center text-muted font-body py-20">
                        No articles published yet. Check back soon!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post: BlogPost) => (
                            <Link
                                key={post.slug}
                                href={`/news/articles/${post.slug}`}
                                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    {post.hero_image_url ? (
                                        <Image
                                            src={post.hero_image_url}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-cream" />
                                    )}
                                </div>
                                <div className="p-5">
                                    {/* Tags */}
                                    {post.tags?.[0] && (
                                        <span className="text-xs font-body font-semibold uppercase tracking-wide text-accent mb-2 block">
                                            {post.tags[0]}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-muted font-body text-sm line-clamp-2 mb-3">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="text-xs text-muted font-body">
                                            {formatDate(post.published_at)}
                                        </span>
                                        <span className="text-xs font-body font-semibold text-accent group-hover:underline">
                                            Read more
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
