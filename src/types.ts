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
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Logo" | "Website" | "Branding";
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
  serviceType: "Logo" | "Website" | "All-in-One";
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
