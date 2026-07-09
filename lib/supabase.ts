import { createClient } from '@supabase/supabase-js';
import { BlogPost } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============ Blog Post Functions ============

// Fetch all published posts for blog index page
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('title, slug, excerpt, hero_image_url, author, tags, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return data as BlogPost[];
}

// Fetch single post by slug for blog detail page
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }

    return data as BlogPost;
}

// Fetch latest 3 posts for homepage
export async function getLatestBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('title, slug, excerpt, hero_image_url, published_at, tags')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

    if (error) {
        console.error('Error fetching latest posts:', error);
        return [];
    }

    return data as BlogPost[];
}

// Fetch all slugs for generateStaticParams
export async function getAllBlogSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('status', 'published');

    if (error) return [];
    return data.map((post) => post.slug);
}

// Fetching all Persian Blog posts
export async function getAllPersianBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_translations')
        .select('title, slug, excerpt, hero_image_url, author, tags, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching Persian blog posts:', error);
        return [];
    }

    return data as BlogPost[];
}

// Fetching single Persian blog post
export async function getPersianBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_translations')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (error) {
        console.error('Error fetching Persian blog post:', error);
        return null;
    }

    return data as BlogPost;
}

// Fetching all Persian Slugs
export async function getAllPersianBlogSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('blog_translations')
        .select('slug')
        .eq('status', 'published');

    if (error) return [];

    return data.map((post) => post.slug);
}
