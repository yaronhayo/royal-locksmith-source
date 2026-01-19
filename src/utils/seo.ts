import { siteConfig } from '../config/site.config';
import type { SEOProps } from '../types';

/**
 * Generate page title with template
 */
export function getPageTitle(title?: string): string {
  if (!title) return siteConfig.seo.defaultTitle;
  return siteConfig.seo.titleTemplate.replace('%s', title);
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${siteConfig.url}${cleanPath}`;
  // Ensure trailing slash consistency
  return url.endsWith('/') ? url : `${url}/`;
}

/**
 * Generate Open Graph image URL
 */
export function getOgImageUrl(image?: string): string {
  if (!image) return `${siteConfig.url}${siteConfig.ogImage}`;
  if (image.startsWith('http')) return image;
  return `${siteConfig.url}${image.startsWith('/') ? image : `/${image}`}`;
}

/**
 * Generate robots meta content
 */
export function getRobotsContent(noindex?: boolean, nofollow?: boolean): string {
  const directives: string[] = [];
  
  directives.push(noindex ? 'noindex' : 'index');
  directives.push(nofollow ? 'nofollow' : 'follow');
  directives.push('max-image-preview:large');
  directives.push('max-snippet:-1');
  directives.push('max-video-preview:-1');
  
  return directives.join(', ');
}

/**
 * Generate complete SEO meta tags object
 */
export function getSEOMeta(props: SEOProps & { path: string }) {
  const {
    title,
    description = siteConfig.seo.defaultDescription,
    canonical,
    ogImage,
    ogType = 'website',
    noindex = false,
    nofollow = false,
    path,
  } = props;

  return {
    title: getPageTitle(title),
    description,
    canonical: canonical || getCanonicalUrl(path),
    robots: getRobotsContent(noindex, nofollow),
    openGraph: {
      title: getPageTitle(title),
      description,
      url: canonical || getCanonicalUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.seo.locale,
      type: ogType,
      image: getOgImageUrl(ogImage),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.seo.twitterHandle,
      title: getPageTitle(title),
      description,
      image: getOgImageUrl(ogImage),
    },
  };
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Generate phone href
 */
export function getPhoneHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`;
}
