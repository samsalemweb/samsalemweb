import { getAllPersianBlogPosts } from '@/lib/supabase';
import { BlogPost } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export const revalidate = 60;

export const metadata = {
    title: 'مقالات و تحلیل‌های بازار املاک | Sam Salem',
    description:
        'جدیدترین مقالات، راهنمای خرید خانه و تحلیل بازار املاک در North Vancouver و Greater Vancouver.',
};

export default async function ArticlesPage() {
    const posts = await getAllPersianBlogPosts();

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div
    dir="rtl"
    className={`${vazirmatn.className} min-h-screen bg-background text-right`}
>
            {/* Header */}
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        به روز بمانید
                    </p>
                    <h1 className="text-right text-3xl md:text-4xl font-heading font-semibold text-white">
                        مقالات و تحلیل‌های بازار املاک
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base text-right">
                        آخرین مقالات، راهنمای خرید خانه و تحلیل بازار املاک North Vancouver
                    </p>
                </div>
            </div>
<div className="flex justify-center py-8">
    <div className="inline-flex rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Link
    href="/fa/news/articles"
    className="px-6 py-2.5 bg-accent text-white ..."
>
    فارسی
</Link>

<Link
    href="/news/articles"
    className="px-6 py-2.5 bg-white text-foreground hover:bg-gray-50 ..."
>
    English
</Link>
    </div>
</div>
            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {posts.length === 0 ? (
                    <p className="text-center text-muted font-body py-20">
                        هنوز مقاله‌ای منتشر نشده است.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post: BlogPost) => (
                            <Link
                                key={post.slug}
                                href={`/fa/news/articles/${post.slug}`}
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
                                            ادامه مطلب
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
