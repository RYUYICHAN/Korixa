/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteSettings {
  agencyName: string;
  agencySlogan: string;
  accentColor: "green" | "purple" | "orange";
  fontStyle: "sans" | "serif" | "display" | "mono";
  heroTitle: string;
  heroSubtitle: string;
  logoDesignDescription: string;
  webDevelopmentDescription: string;
  // Expanded customizable parameters for the ultimate editor experience:
  customAccentHex?: string; // e.g. #3b82f6 for blue, any custom user color
  customThemeMode?: "light" | "dark" | "ivory" | "midnight"; 
  headingFontSizeOffset?: number; // offset in px or % for headings adjustments
  bodyFontSizeOffset?: number; // offsets
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactInstaLink?: string;
  contactKakaoLink?: string;
  contactLinkedinLink?: string;
  showLockerSimulator?: boolean; // toggle to hide/show hero lockers flow
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Smart" | "Standard" | "Special";
  client: string;
  imageUrl: string;
  description: string;
  date: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: "Smart" | "Standard" | "Consult";
  message: string;
  date: string;
  status: "pending" | "completed";
}

export interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  author: string;
  ogImage: string;
}
