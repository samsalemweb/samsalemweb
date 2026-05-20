export interface PresaleListing {
  id: number;
  listing_name: string;
  developer: string;
  city: string;
  neighbourhood: string;
  price_range: string;
  listing_status: string;
  build_status: string;
  move_in: string;
  beds: string;
  baths: string;
  sq_ft: string;
  strata_fee: string;
  units_avail: string;
  total_units: string;
  property_type: string;
  sales_center_address: string;
  phone: string;
  email: string;
  source_url: string;
}

export interface PresaleListingImage {
  listing_name: string;
  slug: string;
  image_number: number;
  cloudinary_public_id: string;
  original_livabl_image_url: string;
  cloudinary_url: string;
}

export interface PresaleWithImages extends PresaleListing {
  slug: string;
  images: { url: string; alt: string }[];
  cover_image: string | null;
}
