# Google Compliance Guide

This document outlines how this template complies with Google's Search guidelines and best practices for Service Area Businesses (SABs) like locksmiths.

## Table of Contents

1. [Search Essentials Compliance](#search-essentials-compliance)
2. [Technical Requirements](#technical-requirements)
3. [Content Quality Guidelines](#content-quality-guidelines)
4. [Spam Policy Compliance](#spam-policy-compliance)
5. [Local SEO for SABs](#local-seo-for-sabs)
6. [Structured Data Implementation](#structured-data-implementation)
7. [E-E-A-T Signals](#e-e-a-t-signals)

---

## Search Essentials Compliance

### Technical Requirements Met

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Googlebot access | robots.txt allows all search crawlers | ✅ |
| HTTP status codes | All pages return 200, proper 404 handling | ✅ |
| Indexable content | Server-rendered HTML with semantic markup | ✅ |
| Mobile-friendly | Responsive design with Tailwind CSS | ✅ |
| HTTPS ready | Template configured for HTTPS deployment | ✅ |
| Page speed | Static generation, optimized assets | ✅ |

### Content Requirements Met

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Unique titles | Dynamic title generation per page | ✅ |
| Meta descriptions | Unique descriptions for each page type | ✅ |
| Heading hierarchy | Proper H1-H6 structure | ✅ |
| Alt text | Image alt text placeholders | ✅ |
| Internal linking | Navigation and contextual links | ✅ |

---

## Technical Requirements

### Crawling & Indexing

The template implements proper crawling controls:

```txt
# robots.txt configuration
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
```

**Sitemap Generation**: Automatic XML sitemap via `@astrojs/sitemap` integration.

**Canonical URLs**: Every page includes a canonical URL to prevent duplicate content issues.

### Page Speed Optimization

The template achieves excellent Core Web Vitals through:

1. **Static Site Generation** - Pre-rendered HTML for instant loading
2. **View Transitions** - Smooth navigation without full page reloads
3. **Font Optimization** - Self-hosted Inter font with proper preloading
4. **Image Optimization** - Astro's built-in image optimization
5. **CSS Optimization** - Tailwind CSS purging removes unused styles
6. **JavaScript** - Minimal client-side JS with Partytown for analytics

### Mobile Responsiveness

All components use responsive design patterns:
- Fluid typography with `clamp()` functions
- Mobile-first breakpoint system
- Touch-friendly tap targets (minimum 44x44px)
- Viewport meta tag properly configured

---

## Content Quality Guidelines

### Avoiding Thin Content

**DO NOT** create location pages that only differ by city name. Each location page MUST include:

1. **Unique introductory content** (minimum 150 words)
2. **Location-specific information** (neighborhoods, landmarks, local context)
3. **Relevant service details** for that area
4. **Original images** when possible

### Avoiding Scaled Content Abuse

Google's spam policies prohibit generating many pages with little unique value. This template prevents this by:

1. **Content Collections** - Each location/service requires a separate markdown file with unique content
2. **Minimum Content Guidelines** - Documentation encourages substantial unique content
3. **No Auto-Generation** - Pages are not programmatically generated with just city name swaps

### Content Checklist for Location Pages

Before publishing a location page, ensure:

- [ ] Unique description (not just city name substitution)
- [ ] Local neighborhoods or areas mentioned
- [ ] Specific local context or information
- [ ] At least 200 words of unique body content
- [ ] Relevant local images (if available)

---

## Spam Policy Compliance

### Prohibited Practices (NOT Used)

| Practice | Status | Notes |
|----------|--------|-------|
| Cloaking | ❌ Not used | Same content for users and bots |
| Doorway pages | ❌ Not used | Each page has unique value |
| Hidden text | ❌ Not used | All text visible to users |
| Keyword stuffing | ❌ Not used | Natural language content |
| Link schemes | ❌ Not used | No manipulative linking |
| Scraped content | ❌ Not used | Original content only |
| Sneaky redirects | ❌ Not used | Direct navigation only |

### Doorway Page Prevention

This template is designed to prevent doorway pages:

1. **Unique Content Required** - Location pages pull from content collections requiring unique markdown files
2. **Substantial Differences** - Template encourages neighborhood-specific content, local context
3. **User Value** - Each page must provide genuine value to users searching for that location

**Warning**: Creating multiple location pages with only the city name changed violates Google's spam policies and may result in manual actions.

---

## Local SEO for SABs

### Service Area Business Compliance

For locksmiths and similar mobile service businesses:

| Guideline | Implementation |
|-----------|----------------|
| No physical address display | Template uses `areaServed` instead of street address |
| Service area definition | Locations defined by city/region, not street address |
| Consistent NAP | Name, Area, Phone consistent across all pages |
| Google Business Profile | Integration guidance provided |

### What NOT to Include

Per Google's guidelines for SABs, this template does NOT:

- ❌ Display a physical street address
- ❌ Show a map marker at a specific location
- ❌ Claim a physical storefront
- ❌ Make specific ETA or response time claims
- ❌ Make specific pricing claims

### What IS Included

- ✅ Service area coverage (cities, regions)
- ✅ Phone number for contact
- ✅ Business hours (availability)
- ✅ Service descriptions
- ✅ Trust signals (license, insurance)

---

## Structured Data Implementation

### Schema Types Used

| Schema Type | Purpose | Pages |
|-------------|---------|-------|
| `Locksmith` | Business identity | All pages |
| `Organization` | Company info | Homepage, About |
| `Service` | Service offerings | Service pages |
| `FAQPage` | FAQ sections | Service pages |
| `BreadcrumbList` | Navigation path | All inner pages |
| `Article` | Blog content | Blog posts |
| `WebSite` | Site identity | Homepage |

### LocalBusiness Schema (SAB Compliant)

```json
{
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Business Name",
  "telephone": "+1-555-000-0000",
  "areaServed": [
    { "@type": "City", "name": "Los Angeles" },
    { "@type": "City", "name": "Santa Monica" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Los Angeles",
    "addressRegion": "CA",
    "addressCountry": "US"
  }
}
```

**Note**: No `streetAddress` is included for SAB compliance.

### Validation

Always validate structured data using:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## E-E-A-T Signals

### Experience

- Service history and years in business displayed
- Customer testimonials section
- Case studies/portfolio capability

### Expertise

- Service-specific content pages
- Technical information about security solutions
- Blog for educational content

### Authoritativeness

- License number displayed
- Professional certifications mentioned
- Industry association memberships (add as applicable)

### Trustworthiness

- Clear contact information
- Privacy policy and terms of service
- SSL/HTTPS (deployment requirement)
- No misleading claims
- Transparent about service area

### Trust Signals Checklist

Ensure your site includes:

- [ ] License number (visible on About page)
- [ ] Insurance information
- [ ] Years in business
- [ ] Service area clearly defined
- [ ] Contact information on every page
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Real customer testimonials (with permission)

---

## Additional Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Local Business Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)

---

## Compliance Checklist

Before launching, verify:

### Technical
- [ ] All pages return HTTP 200
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.txt allows Googlebot
- [ ] Mobile-friendly test passes
- [ ] Core Web Vitals in green

### Content
- [ ] Every page has unique title and description
- [ ] No duplicate content across location pages
- [ ] All images have descriptive alt text
- [ ] Content provides genuine user value

### Local SEO
- [ ] Google Business Profile claimed and verified
- [ ] NAP consistent across web
- [ ] Service area properly defined
- [ ] No physical address displayed (for SABs)

### Structured Data
- [ ] All schemas validate without errors
- [ ] LocalBusiness schema on all pages
- [ ] Breadcrumbs on inner pages
- [ ] FAQ schema where applicable
