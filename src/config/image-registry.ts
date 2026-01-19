/**
 * Image Registry - Centralized Image Configuration
 * 
 * Ensures consistency between hero images, card thumbnails, OG meta images,
 * and structured data across all pages.
 */

// Service category and sub-service image mapping
export const serviceImages: Record<string, { hero: string; og: string }> = {
  // Main category pages
  emergency: {
    hero: '/images/produced/service-emergency.png',
    og: '/images/produced/service-emergency.png',
  },
  residential: {
    hero: '/images/produced/service-residential.png',
    og: '/images/produced/service-residential.png',
  },
  commercial: {
    hero: '/images/produced/service-commercial.png',
    og: '/images/produced/service-commercial.png',
  },
  automotive: {
    hero: '/images/produced/service-automotive.png',
    og: '/images/produced/service-automotive.png',
  },

  // Specific Sub-services (Unique Images)
  'master-key-systems': {
    hero: '/images/produced/service-master-key-systems.png',
    og: '/images/produced/service-master-key-systems.png',
  },
  'access-control': {
    hero: '/images/produced/service-access-control.png',
    og: '/images/produced/service-access-control.png',
  },
  'car-key-replacement': {
    hero: '/images/produced/service-car-key-replacement.png',
    og: '/images/produced/service-car-key-replacement.png',
  },
  'emergency-exit-devices': {
    hero: '/images/produced/service-emergency-exit-devices.png',
    og: '/images/produced/service-emergency-exit-devices.png',
  },
  'lock-rekey': {
    hero: '/images/produced/service-lock-rekey.png',
    og: '/images/produced/service-lock-rekey.png',
  },
  'key-fob-programming': {
    hero: '/images/produced/service-key-fob-programming.png',
    og: '/images/produced/service-key-fob-programming.png',
  },
  'ignition-repair': {
    hero: '/images/produced/service-ignition-repair.png',
    og: '/images/produced/service-ignition-repair.png',
  },
  'gate-locks': {
    hero: '/images/produced/service-gate-locks.png',
    og: '/images/produced/service-gate-locks.png',
  },
  'lock-replacement': {
    hero: '/images/produced/service-lock-replacement.png',
    og: '/images/produced/service-lock-replacement.png',
  },
  'house-lockout': {
    hero: '/images/produced/service-house-lockout.png',
    og: '/images/produced/service-house-lockout.png',
  },
  'business-lockout': {
    hero: '/images/produced/service-business-lockout.png',
    og: '/images/produced/service-business-lockout.png',
  },
  'car-lockout': {
    hero: '/images/produced/service-car-lockout.png',
    og: '/images/produced/service-car-lockout.png',
  },
  'storage-unit-lockout': {
    hero: '/images/produced/service-storage-unit-lockout.png',
    og: '/images/produced/service-storage-unit-lockout.png',
  },
  'lock-repair': {
    hero: '/images/produced/service-lock-repair.png',
    og: '/images/produced/service-lock-repair.png',
  },
  'car-key-duplicate': {
    hero: '/images/produced/service-car-key-duplicate.png',
    og: '/images/produced/service-car-key-duplicate.png',
  },
  'commercial-lock-replacement': {
    hero: '/images/produced/service-commercial-lock-replacement.png',
    og: '/images/produced/service-commercial-lock-replacement.png',
  },
};

// Sub-service to parent category mapping (for image inheritance)
export const subServiceToCategory: Record<string, string> = {
  // Emergency sub-services
  'car-lockout': 'emergency',
  'house-lockout': 'emergency',
  'business-lockout': 'emergency',
  'storage-unit-lockout': 'emergency',
  
  // Residential sub-services
  'lock-rekey': 'residential',
  'lock-replacement': 'residential',
  'lock-repair': 'residential',
  'gate-locks': 'residential',
  
  // Commercial sub-services
  'commercial-lock-replacement': 'commercial',
  'master-key-systems': 'commercial',
  'access-control': 'commercial',
  'emergency-exit-devices': 'commercial',
  
  // Automotive sub-services
  'car-key-replacement': 'automotive',
  'car-key-duplicate': 'automotive',
  'key-fob-programming': 'automotive',
  'ignition-repair': 'automotive',
};

// Location images
export const locationImages = {
  default: {
    hero: '/images/produced/hero-locations.png',
    og: '/images/produced/hero-locations.png',
  },
};

// Static page images
export const pageImages: Record<string, { hero?: string; og: string }> = {
  home: {
    hero: '/images/produced/hero-home.png',
    og: '/images/produced/hero-home.png',
  },
  about: {
    hero: '/images/produced/hero-about.png',
    og: '/images/produced/hero-about.png',
  },
  contact: {
    hero: '/images/produced/contact-faq-reviews.png',
    og: '/images/produced/contact-faq-reviews.png',
  },
  faq: {
    hero: '/images/produced/contact-faq-reviews.png',
    og: '/images/produced/contact-faq-reviews.png',
  },
  reviews: {
    hero: '/images/produced/contact-faq-reviews.png',
    og: '/images/produced/contact-faq-reviews.png',
  },
  book: {
    og: '/images/produced/contact-faq-reviews.png',
  },
  privacy: {
    og: '/images/produced/contact-faq-reviews.png',
  },
  terms: {
    og: '/images/produced/contact-faq-reviews.png',
  },
};

/**
 * Get service image paths by slug
 * Falls back to parent category for sub-services
 */
export function getServiceImage(slug: string): { hero: string; og: string } {
  // Direct category match
  if (serviceImages[slug]) {
    return serviceImages[slug];
  }
  
  // Sub-service - get parent category
  const parentCategory = subServiceToCategory[slug];
  if (parentCategory && serviceImages[parentCategory]) {
    return serviceImages[parentCategory];
  }
  
  // Fallback to emergency (most common)
  return serviceImages.emergency;
}

/**
 * Get location image paths
 * Currently all locations use the same generic hero
 */
export function getLocationImage(_slug: string): { hero: string; og: string } {
  return locationImages.default;
}

/**
 * Get static page image
 */
export function getPageImage(page: string): { hero?: string; og: string } {
  return pageImages[page] || { og: '/images/og-image.png' };
}
