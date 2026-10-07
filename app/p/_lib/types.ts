import type { ComponentType } from "react";

export interface BusinessBrand {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface BusinessContact {
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  messenger?: string;
  instagram?: string;
  address?: string;
  mapsUrl?: string;
}

export interface BusinessService {
  name: string;
  description?: string;
  image?: string;
  price?: string;
}

export interface BusinessTestimonial {
  quote: string;
  author: string;
  sourceUrl?: string;
  rating?: number;
  ratingScale?: number;
}

export interface BusinessHours {
  days: string;
  hours: string;
}

export interface BusinessGalleryImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface BusinessTeamMember {
  name: string;
  role?: string;
  biography?: string;
  image?: string;
  credentials?: readonly string[];
}

export interface BusinessCTA {
  label: string;
  href: string;
}

export interface BusinessTrustItem {
  label: string;
  description?: string;
  sourceUrl?: string;
}

/** Facts only. Omit unknown information; never populate it with invented defaults. */
export interface BusinessPreview {
  slug: string;
  name: string;
  industry?: string;
  location?: string;
  description?: string;
  fictional?: boolean;
  branding?: BusinessBrand;
  contact?: BusinessContact;
  services?: readonly BusinessService[];
  testimonials?: readonly BusinessTestimonial[];
  businessHours?: readonly BusinessHours[];
  gallery?: readonly BusinessGalleryImage[];
  team?: readonly BusinessTeamMember[];
  ctas?: readonly BusinessCTA[];
  trustItems?: readonly BusinessTrustItem[];
  metadata?: {
    /** The infrastructure always appends "Concept Website". */
    title?: string;
    description?: string;
  };
}

export interface BusinessWebsiteProps {
  business: BusinessPreview;
}

export interface BusinessPreviewEntry {
  business: BusinessPreview;
  Website: ComponentType<BusinessWebsiteProps>;
}
