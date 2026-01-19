/**
 * Site Configuration
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DEPLOYMENT CHECKLIST - Update all [PLACEHOLDER] values below   │
 * │  before deploying to production!                                │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * Required updates:
 * 1. contact.phone - Update with real business phone
 * 2. contact.email - Update with real business email  
 * 3. socials.* - Update with real social media URLs
 * 4. analytics.* - Add real tracking IDs
 * 5. apiKeys.* - Add real API keys (or set env vars)
 * 
 * GOOGLE COMPLIANCE (especially for locksmiths/SABs):
 * - Do NOT display a physical street address if you're a Service Area Business
 * - Do NOT make specific ETA or response time claims
 * - Do NOT make specific pricing claims
 * - Focus on free estimates and professional service
 */

export const siteConfig = {
  // ============================================
  // BASIC INFO
  // ============================================
  name: 'Royal Locksmith',
  legalName: 'Royal Locksmith LLC',
  tagline: 'Professional Security Solutions',
  description: 'Expert locksmith services for residential, commercial, and automotive security needs. Licensed, insured, and trusted by thousands.',
  
  // ============================================
  // URLS & DOMAIN
  // ============================================
  url: import.meta.env.PUBLIC_SITE_URL || 'https://www.royallocksmithnj.com',
  ogImage: '/images/og-image.png',
  
  // ============================================
  // SERVICE AREA (SAB Compliant - No Street Address)
  // ============================================
  serviceArea: {
    primaryCity: 'North Bergen',
    region: 'Northern New Jersey',
    state: 'NJ',
    stateFullName: 'New Jersey',
    country: 'US',
    countryFullName: 'United States',
    // Counties served: Hudson, Bergen, Essex, Passaic, Union, Morris
    counties: ['Hudson', 'Bergen', 'Essex', 'Passaic', 'Union', 'Morris'],
    coordinates: {
      lat: 40.8040,
      lng: -74.0121,
    },
  },
  
  // ============================================
  // CONTACT INFO [PLACEHOLDER - UPDATE BEFORE DEPLOY]
  // ============================================
  contact: {
    phone: {
      // Real business phone number
      display: import.meta.env.PUBLIC_PHONE_DISPLAY || '(551) 292-8090',
      href: import.meta.env.PUBLIC_PHONE_HREF || '+15512928090',
    },
    email: import.meta.env.PUBLIC_EMAIL || 'info@royallocksmithnj.com',
    // Generic hours - no specific response time claims
    hours: 'Available 24/7',
  },
  
  // ============================================
  // SOCIAL MEDIA [PLACEHOLDER - UPDATE BEFORE DEPLOY]
  // Set to empty string to hide from footer/UI
  // ============================================
  socials: {
    facebook: import.meta.env.PUBLIC_FACEBOOK_URL || 'https://facebook.com/royallocksmithnj',
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || 'https://instagram.com/royallocksmithnj',
    twitter: import.meta.env.PUBLIC_TWITTER_URL || '', // Hidden - not active
    youtube: import.meta.env.PUBLIC_YOUTUBE_URL || '', // Hidden - not active
    linkedin: import.meta.env.PUBLIC_LINKEDIN_URL || '', // Hidden - not active
    yelp: import.meta.env.PUBLIC_YELP_URL || 'https://yelp.com/biz/royal-locksmith-north-bergen',
    google: import.meta.env.PUBLIC_GOOGLE_BUSINESS_URL || 'https://g.page/royallocksmithnj',
  },
  
  // ============================================
  // SERVICES
  // ============================================
  services: [
    {
      name: 'Residential Locksmith',
      slug: 'residential',
      shortDescription: 'Home security solutions including lock installation, rekeying, and smart locks.',
      icon: 'home',
    },
    {
      name: 'Commercial Locksmith',
      slug: 'commercial',
      shortDescription: 'Business security systems, access control, and master key systems.',
      icon: 'building-2',
    },
    {
      name: 'Automotive Locksmith',
      slug: 'automotive',
      shortDescription: 'Car lockouts, key replacement, and transponder programming.',
      icon: 'car',
    },
    {
      name: 'Emergency Locksmith',
      slug: 'emergency',
      shortDescription: 'Urgent locksmith assistance when you need it most.',
      icon: 'alert-triangle',
    },
  ],
  
  // ============================================
  // SERVICE LOCATIONS - Northern New Jersey
  // ============================================
  locations: [
    // Hudson County
    { name: 'North Bergen', slug: 'north-bergen', isHeadquarters: true, coordinates: { lat: 40.8040, lng: -74.0121 } },
    { name: 'Jersey City', slug: 'jersey-city', isHeadquarters: false, coordinates: { lat: 40.7178, lng: -74.0431 } },
    { name: 'Hoboken', slug: 'hoboken', isHeadquarters: false, coordinates: { lat: 40.7440, lng: -74.0324 } },
    { name: 'Union City', slug: 'union-city', isHeadquarters: false, coordinates: { lat: 40.7795, lng: -74.0246 } },
    { name: 'West New York', slug: 'west-new-york', isHeadquarters: false, coordinates: { lat: 40.7870, lng: -74.0143 } },
    { name: 'Bayonne', slug: 'bayonne', isHeadquarters: false, coordinates: { lat: 40.6687, lng: -74.1143 } },
    { name: 'Kearny', slug: 'kearny', isHeadquarters: false, coordinates: { lat: 40.7684, lng: -74.1454 } },
    // Bergen County
    { name: 'Hackensack', slug: 'hackensack', isHeadquarters: false, coordinates: { lat: 40.8860, lng: -74.0435 } },
    { name: 'Fort Lee', slug: 'fort-lee', isHeadquarters: false, coordinates: { lat: 40.8509, lng: -73.9701 } },
    { name: 'Englewood', slug: 'englewood', isHeadquarters: false, coordinates: { lat: 40.8929, lng: -73.9726 } },
    { name: 'Teaneck', slug: 'teaneck', isHeadquarters: false, coordinates: { lat: 40.8976, lng: -74.0159 } },
    { name: 'Paramus', slug: 'paramus', isHeadquarters: false, coordinates: { lat: 40.9445, lng: -74.0754 } },
    { name: 'Bergenfield', slug: 'bergenfield', isHeadquarters: false, coordinates: { lat: 40.9276, lng: -73.9965 } },
    { name: 'Ridgewood', slug: 'ridgewood', isHeadquarters: false, coordinates: { lat: 40.9793, lng: -74.1166 } },
    // Essex County
    { name: 'Newark', slug: 'newark', isHeadquarters: false, coordinates: { lat: 40.7357, lng: -74.1724 } },
    { name: 'Bloomfield', slug: 'bloomfield', isHeadquarters: false, coordinates: { lat: 40.8068, lng: -74.1854 } },
    { name: 'Montclair', slug: 'montclair', isHeadquarters: false, coordinates: { lat: 40.8259, lng: -74.2090 } },
    { name: 'Livingston', slug: 'livingston', isHeadquarters: false, coordinates: { lat: 40.7960, lng: -74.3290 } },
    // Passaic County
    { name: 'Passaic', slug: 'passaic', isHeadquarters: false, coordinates: { lat: 40.8568, lng: -74.1285 } },
    { name: 'Paterson', slug: 'paterson', isHeadquarters: false, coordinates: { lat: 40.9168, lng: -74.1718 } },
    { name: 'Clifton', slug: 'clifton', isHeadquarters: false, coordinates: { lat: 40.8584, lng: -74.1638 } },
    // Union County
    { name: 'Elizabeth', slug: 'elizabeth', isHeadquarters: false, coordinates: { lat: 40.6640, lng: -74.2107 } },
  ],
  
  // ============================================
  // TRUST SIGNALS (No specific claims)
  // ============================================
  trustSignals: {
    yearsInBusiness: 15,
    isLicensed: true,
    isInsured: true,
    isBonded: true,
    licenseNumber: '34LX00010800',
  },
  
  // ============================================
  // NAVIGATION - Complete with all pages
  // ============================================
  navigation: {
    // Main navigation (excludes Home link per requirement)
    main: [
      { label: 'Services', href: '/services/', hasDropdown: true },
      { label: 'Service Areas', href: '/locations/', hasDropdown: true },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Reviews', href: '/reviews/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
    // CTA button in header
    cta: {
      label: 'Book Service',
      href: '/book/',
      icon: 'calendar-plus',
    },
    // Footer navigation groups (4 columns: Company, Quick Links, then Business Hours & Contact rendered separately)
    footer: [
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about/' },
          { label: 'Reviews', href: '/reviews/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'FAQ', href: '/faq/' },
          { label: 'Careers', href: '/contact/' },
        ],
      },
      {
        title: 'Quick Links',
        links: [
          { label: 'All Services', href: '/services/' },
          { label: 'Service Areas', href: '/locations/' },
          { label: 'Book Service', href: '/book/' },
          { label: 'Contact Us', href: '/contact/' },
          { label: 'Free Estimate', href: '/book/' },
        ],
      },
    ],
  },
  
  // ============================================
  // SEO DEFAULTS
  // ============================================
  seo: {
    titleTemplate: '%s | Royal Locksmith NJ',
    defaultTitle: 'Locksmith Near Me | 24/7 Emergency Service in North Bergen NJ',
    defaultDescription: 'Locked out? Licensed 24/7 locksmith helping homeowners, car owners & businesses in Northern NJ. House lockout, car lockout, lock rekey, smart locks. Free estimates!',
    twitterHandle: '@royallocksmith',
    locale: 'en_US',
  },
  
  // ============================================
  // ANALYTICS & TRACKING
  // ============================================
  analytics: {
    googleAnalyticsId: import.meta.env.PUBLIC_GA_ID || '', // GA4: G-XXXXXXXXXX
    googleTagManagerId: import.meta.env.PUBLIC_GTM_ID || 'GTM-TFV67XJQ', // GTM ID
    facebookPixelId: import.meta.env.PUBLIC_FB_PIXEL_ID || '', // Facebook Pixel ID
  },
  
  // ============================================
  // API KEYS (Client-side only - public keys)
  // ============================================
  apiKeys: {
    googleMaps: import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyD3Yz0JL_NHAm3UtT9L8fi6QH6NeEFCOpA',
    recaptchaSiteKey: import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || '6LckcK0rAAAAAN8YJ3Hg1yy8mWml0z6pHYXSCmmU',
  },
  
  // ============================================
  // FORM CONFIGURATION
  // ============================================
  forms: {
    contactEndpoint: '/api/contact.php',
    bookingEndpoint: '/api/contact.php',
    enableAddressAutocomplete: true,
    addressCountryRestriction: 'us',
  },
  
  // ============================================
  // FEATURES FLAGS
  // ============================================
  features: {
    enableBlog: true,
    enableTestimonials: true,
    enableDarkMode: true,
    enableSearch: false,
    enableChat: false,
    enableServiceAreaMap: true,
    enableStickyHeader: true,
    enableScrollToTop: true,
    enableStickyWidgets: true,
  },
  
  // ============================================
  // WIDGET CONFIGURATION
  // ============================================
  widgets: {
    // Phone CTA widget
    phoneCta: {
      enabled: true,
      text: 'Call Now',
      subtext: 'Free Estimates',
    },
    // Trust badges widget
    trustBadges: {
      enabled: true,
      badges: [
        { icon: 'shield-check', label: 'Licensed & Insured' },
        { icon: 'award', label: 'Certified Technicians' },
        { icon: 'star', label: '5-Star Rated' },
        { icon: 'clock', label: 'Available 24/7' },
      ],
    },
    // Quick contact widget
    quickContact: {
      enabled: true,
      showInSidebar: true,
    },
  },
} as const;

// Type exports
export type SiteConfig = typeof siteConfig;
export type Service = typeof siteConfig.services[number];
export type Location = typeof siteConfig.locations[number];
export type NavItem = typeof siteConfig.navigation.main[number];
