# Royal Locksmith - Configuration Quick Reference

This guide shows you how to update common settings in the website without needing to modify code.

---

## 📞 Contact Information

**File to edit:** `.env`

```bash
# Phone number (formatted for display)
PUBLIC_PHONE_DISPLAY=(201) 555-0123

# Phone number (for tel: links, include country code)
PUBLIC_PHONE_HREF=+12015550123

# Business email
PUBLIC_EMAIL=info@royallocksmithnj.com
```

After editing, rebuild the site:
```bash
npm run build
```

---

## 🏙️ Service Areas / Locations

### Add a New City

1. Create a new file: `src/content/locations/[city-slug].md`
2. Use this template:

```markdown
---
title: "City Name Locksmith Service"
name: "City Name"
description: "Professional 24/7 locksmith services in City Name, NJ."
metaTitle: "Locksmith City Name NJ | 24/7 Emergency, Car & Home Security"
metaDescription: "Locked out in City Name? Royal Locksmith is here..."
focusKeyword: "locksmith City Name"
neighborhoods:
  - "Neighborhood 1"
  - "Neighborhood 2"
zipCodes:
  - "07XXX"
order: 23
draft: false
---

Your markdown content here...
```

3. Add the city to `src/config/site.config.ts` in the `locations` array:
```typescript
{ name: 'City Name', slug: 'city-name', isHeadquarters: false, coordinates: { lat: XX.XXXX, lng: -XX.XXXX } },
```

---

## 🔧 Services

### Add a New Service

1. Create a new file: `src/content/services/[service-slug].md`
2. Use this template:

```markdown
---
title: "Service Name"
shortDescription: "Brief description of the service."
description: "Detailed description for SEO and page content."
metaTitle: "Service Name | Royal Locksmith NJ"
metaDescription: "Your meta description here..."
focusKeyword: "service keyword NJ"
icon: "home"  # Options: home, building, car, alert-circle
category: "residential"  # Options: residential, commercial, automotive, emergency
features:
  - "Feature 1"
  - "Feature 2"
order: 1
draft: false
---

Your markdown content here...
```

---

## ⭐ Testimonials

### Add a New Review

Create a new file: `src/content/testimonials/[firstname-lastinitial].json`

```json
{
  "name": "John D.",
  "location": "North Bergen, NJ",
  "rating": 5,
  "text": "The review text goes here...",
  "service": "Residential",
  "date": "2026-01-15",
  "featured": false
}
```

**Note:** Set `"featured": true` to display prominently on the homepage.

---

## 📱 Social Media Links

**File to edit:** `.env`

```bash
PUBLIC_FACEBOOK_URL=https://facebook.com/royallocksmith
PUBLIC_INSTAGRAM_URL=https://instagram.com/royallocksmith
PUBLIC_GOOGLE_BUSINESS_URL=https://g.page/royallocksmith
PUBLIC_YELP_URL=https://yelp.com/biz/royal-locksmith
```

Leave empty to hide from footer:
```bash
PUBLIC_TWITTER_URL=
```

---

## 📊 Analytics & Tracking

**File to edit:** `.env`

```bash
# Google Analytics 4
PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Tag Manager
PUBLIC_GTM_ID=GTM-TFV67XJQ
```

---

## 🔐 Backend Configuration (Sensitive)

**File to edit:** `public/api/config.php`

| Setting | Purpose |
|:--------|:--------|
| `SMTP2GO_API_KEY` | Email delivery for contact/booking forms |
| `RECAPTCHA_SECRET_KEY` | Spam protection verification |
| `COMPANY_EMAIL_ADDRESSES` | Recipients for form submissions |

⚠️ **Never commit real API keys to version control.**

---

## ⏰ Business Hours

**File to edit:** `src/components/common/Footer.astro`

Look for the `businessHours` array near line 18:

```javascript
const businessHours = [
  { day: 'Monday', hours: '24 Hours' },
  { day: 'Tuesday', hours: '24 Hours' },
  // ... etc
];
```

---

## 🎨 Branding

| What | Where |
|:-----|:------|
| Logo | `public/images/logo.webp` |
| Favicon | `public/favicon.svg`, `public/favicon-*.png` |
| OG Image | `public/images/og-image.png` |
| Colors | `src/assets/styles/global.css` (CSS variables) |
| Company Name | `src/config/site.config.ts` → `name`, `legalName` |

---

## 🏗️ Building & Deploying

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## File Structure Overview

```
src/
├── config/
│   └── site.config.ts    # ← Central configuration (SSOT)
├── content/
│   ├── services/         # ← Service pages (markdown)
│   ├── locations/        # ← City pages (markdown)
│   ├── blog/             # ← Blog posts (markdown)
│   └── testimonials/     # ← Reviews (JSON)
├── components/           # ← UI components
├── pages/                # ← Page templates
└── assets/styles/        # ← CSS & design tokens

public/
├── api/
│   └── config.php        # ← Backend secrets
└── images/               # ← Static images

.env                      # ← Environment variables
```

---

*Last updated: January 2026*
