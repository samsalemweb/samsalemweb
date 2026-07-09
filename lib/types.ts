export interface Listing {
  id: string;
  title: string;
  address: string;
  city: string;
  area: string;
  price: number;
  status: 'For Sale' | 'Sold' | 'Presale';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: 'Detached' | 'Condo' | 'Townhouse' | 'Duplex' | 'Land';
  images: string[];
  description: string;
  features: string[];
  listedDate: string;
  soldDate: string | null;
  mlsId: string | null;
  listingBrokerage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  photo?: string;
  source: string;
}

export interface Area {
  slug: string;
  name: string;
  description: string;
  image: string;
  avgPrice: number;
  highlights: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Buying Tips' | 'Selling Tips' | 'Market Updates' | 'Neighbourhood Guide';
  date: string;
  image: string;
  author: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string | null;
  hero_image_url: string | null;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  blog_post_id?: string;

  blog_posts?: {
    id: string;
    slug: string;
    title: string;
  };
}

