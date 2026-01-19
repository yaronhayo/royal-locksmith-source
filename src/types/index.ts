// ============================================
// SEO Types
// ============================================
export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  nofollow?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// ============================================
// Schema Types (Flexible for JSON-LD generation)
// ============================================

// Use Record types for flexible schema generation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LocalBusinessSchema = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceSchema = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FAQSchema = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BreadcrumbSchema = Record<string, any>;

export interface AreaServed {
  '@type': 'City' | 'State' | 'Country';
  name: string;
  containedInPlace?: {
    '@type': string;
    name: string;
  };
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
  streetAddress?: string;
  postalCode?: string;
}

export interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface FAQItem {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface BreadcrumbSchemaItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

// ============================================
// Component Props Types
// ============================================
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface CardProps {
  variant?: 'default' | 'hover' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'search';
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
  container?: boolean;
  size?: 'sm' | 'md' | 'lg';
  background?: 'default' | 'muted' | 'primary' | 'dark';
  children: React.ReactNode;
}

// ============================================
// Content Types
// ============================================
export interface ServiceContent {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface LocationContent {
  name: string;
  slug: string;
  description?: string;
  services?: string[];
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  draft?: boolean;
}

export interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
}

// ============================================
// Form Types
// ============================================
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}

export interface QuoteFormData extends ContactFormData {
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
}
