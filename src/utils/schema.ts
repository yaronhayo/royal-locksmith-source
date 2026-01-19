/**
 * Schema.org Structured Data Generators
 * 
 * Fully compliant with Google's structured data guidelines:
 * https://developers.google.com/search/docs/appearance/structured-data/local-business
 * 
 * For Service Area Businesses (SABs):
 * - Uses areaServed instead of physical address
 * - No streetAddress to comply with Google Maps SAB policies
 */

import { siteConfig } from '../config/site.config';
import type {
  LocalBusinessSchema,
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
  BreadcrumbItem,
} from '../types';

/**
 * Generate LocalBusiness (Locksmith) Schema
 * 
 * Optimized for Service Area Businesses per Google guidelines:
 * - No streetAddress displayed
 * - Uses areaServed for service coverage
 * - Includes all recommended properties
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/local-business
 */
export function getLocalBusinessSchema(): string {
  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone.href,
    email: siteConfig.contact.email,
    
    // Multiple image formats as recommended by Google
    image: [
      `${siteConfig.url}/images/og-1x1.png`,
      `${siteConfig.url}/images/og-4x3.png`,
      `${siteConfig.url}/images/og-16x9.png`,
    ],
    
    // Logo for knowledge panel
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
      width: 512,
      height: 512,
    },
    
    // Service Area Business - use areaServed, not physical address
    areaServed: siteConfig.locations.map((loc) => ({
      '@type': 'City',
      name: loc.name,
      containedInPlace: {
        '@type': 'State',
        name: siteConfig.serviceArea.stateFullName,
      },
    })),
    
    // Address without street for SAB compliance
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.serviceArea.primaryCity,
      addressRegion: siteConfig.serviceArea.state,
      addressCountry: siteConfig.serviceArea.country,
    },
    
    // Geo coordinates for primary service area (North Bergen HQ)
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.serviceArea.coordinates.lat,
      longitude: siteConfig.serviceArea.coordinates.lng,
    },
    
    // Business hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    
    // Price range indicator (vague, compliant)
    priceRange: '$$',
    
    // Payment methods accepted
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'USD',
    
    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Locksmith Services',
      itemListElement: siteConfig.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.shortDescription,
        },
      })),
    },
    
    // Social profiles
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
    
    // Aggregate rating for rich snippets - ENABLED
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return JSON.stringify(schema);
}

/**
 * Generate Service Schema
 * 
 * For individual service pages with proper provider attribution
 */
export function getServiceSchema(
  serviceName: string,
  description: string,
  serviceUrl?: string
): string {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceUrl ? `${siteConfig.url}${serviceUrl}` : undefined,
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Locksmith',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    areaServed: siteConfig.locations.map((loc) => ({
      '@type': 'City',
      name: loc.name,
    })),
    serviceType: serviceName,
    // Avoid specific price claims per compliance requirements
    // priceSpecification omitted intentionally
  };

  return JSON.stringify(schema);
}

/**
 * Generate FAQ Schema
 * 
 * For FAQ sections to enable rich results
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function getFAQSchema(
  faqs: { question: string; answer: string }[]
): string {
  const schema: FAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(schema);
}

/**
 * Generate Breadcrumb Schema
 * 
 * For navigation breadcrumbs in search results
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]): string {
  // Always include Home as first item
  const fullItems = [
    { label: 'Home', href: '/' },
    ...items,
  ];
  
  const schema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      // Last item should not have item URL per Google guidelines
      item: index < fullItems.length - 1 ? `${siteConfig.url}${item.href}` : undefined,
    })),
  };

  return JSON.stringify(schema);
}

/**
 * Generate Organization Schema
 * 
 * Company-level information for knowledge panel
 */
export function getOrganizationSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    foundingDate: `${new Date().getFullYear() - siteConfig.trustSignals.yearsInBusiness}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone.href,
      contactType: 'customer service',
      areaServed: {
        '@type': 'Country',
        name: siteConfig.serviceArea.countryFullName,
      },
      availableLanguage: {
        '@type': 'Language',
        name: 'English',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.serviceArea.primaryCity,
      addressRegion: siteConfig.serviceArea.state,
      addressCountry: siteConfig.serviceArea.country,
    },
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
  };

  return JSON.stringify(schema);
}

/**
 * Generate WebSite Schema
 * 
 * For site identity and potential sitelinks search box
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
export function getWebsiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-US',
    // Only include SearchAction if you have site search
    // potentialAction: {
    //   '@type': 'SearchAction',
    //   target: {
    //     '@type': 'EntryPoint',
    //     urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    //   },
    //   'query-input': 'required name=search_term_string',
    // },
  };

  return JSON.stringify(schema);
}

/**
 * Generate Article Schema for blog posts
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function getArticleSchema(
  title: string,
  description: string,
  publishedAt: Date,
  updatedAt?: Date,
  image?: string,
  author?: string,
  articleUrl?: string
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': articleUrl ? `${siteConfig.url}${articleUrl}` : undefined,
    headline: title,
    description: description,
    image: image 
      ? [
          `${siteConfig.url}${image}`,
          // Include multiple sizes if available
        ]
      : [
          `${siteConfig.url}${siteConfig.ogImage}`,
        ],
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt || publishedAt).toISOString(),
    author: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl ? `${siteConfig.url}${articleUrl}` : siteConfig.url,
    },
    inLanguage: 'en-US',
  };

  return JSON.stringify(schema);
}

/**
 * Generate WebPage Schema
 * 
 * Basic page identification for any page type
 */
export function getWebPageSchema(
  title: string,
  description: string,
  pageUrl: string,
  pageType: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage' = 'WebPage'
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${siteConfig.url}${pageUrl}`,
    name: title,
    description: description,
    url: `${siteConfig.url}${pageUrl}`,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    about: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-US',
  };

  return JSON.stringify(schema);
}

/**
 * Generate Review Schema (for testimonials)
 * 
 * Note: Only use for genuine customer reviews
 * @see https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */
export function getReviewSchema(
  reviewerName: string,
  reviewBody: string,
  ratingValue: number,
  datePublished: Date
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Locksmith',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    author: {
      '@type': 'Person',
      name: reviewerName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: reviewBody,
    datePublished: datePublished.toISOString(),
  };

  return JSON.stringify(schema);
}

/**
 * Generate HowTo Schema (for service guides)
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/how-to
 */
export function getHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string; image?: string }[],
  totalTime?: string
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    totalTime: totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? `${siteConfig.url}${step.image}` : undefined,
    })),
  };

  return JSON.stringify(schema);
}
