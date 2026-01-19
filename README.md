# Astro Local SEO Starter Template

A comprehensive, production-ready Astro 5.0 starter template specifically designed for local SEO and home services businesses (locksmiths, plumbers, HVAC, etc.). Built with modern best practices, strict Google compliance for Service Area Businesses (SABs), and AI discoverability in mind.

## Key Features

### Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Astro 5.0 | Static site generation with View Transitions |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS with custom design system |
| **UI Components** | React 19 + Framer Motion | Interactive components with smooth animations |
| **Icons** | Astro Icon + Lucide/MDI | Comprehensive icon library |
| **Content** | Astro Content Collections | Type-safe content management |
| **SEO** | astro-seo + JSON-LD | Complete meta tag and schema management |
| **Performance** | Partytown + Sharp | Third-party script isolation and image optimization |
| **Type Safety** | TypeScript (strict) | Full type checking throughout |
| **Code Quality** | ESLint + Prettier | Consistent code formatting |

### Google Compliance (SAB Optimized)

This template is built with strict adherence to Google's policies for Service Area Businesses:

- **No ETAs or Response Times**: Fully compliant with Google's locksmith/home services policies
- **No Specific Pricing Claims**: Emphasizes free estimates and professional assessments
- **No Physical Address Display**: Focuses on service area coverage only
- **Comprehensive Schema**: LocalBusiness, Service, FAQ, Breadcrumb schemas
- **AI-Ready Structure**: Semantic HTML optimized for LLMs and voice assistants

### Design System

The template includes a complete design system with:

- CSS custom properties for theming (light/dark mode)
- Responsive typography scale with Inter font
- Custom animations and micro-interactions
- Comprehensive component library
- Mobile-first responsive design

## Quick Start

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone or download the template
git clone <repository-url> my-business-site
cd my-business-site

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

1. **Update Site Config**: Edit `src/config/site.config.ts` with your business details
2. **Add Content**: Create service and location pages in `src/content/`
3. **Customize Styling**: Modify `tailwind.config.mjs` for brand colors
4. **Add Images**: Place images in `public/images/`

## Project Structure

```
src/
├── assets/
│   ├── images/          # Optimized images (use Astro Image)
│   ├── icons/           # Custom SVG icons
│   └── styles/
│       └── global.css   # Tailwind directives & CSS variables
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Badge.tsx
│   │   ├── Section.tsx
│   │   ├── Accordion.tsx
│   │   └── Skeleton.tsx
│   ├── common/          # Layout components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Schema.astro
│   │   └── Breadcrumbs.astro
│   └── forms/           # Form components
│       └── ContactForm.tsx
├── content/
│   ├── services/        # Service pages (Markdown/MDX)
│   ├── locations/       # Location pages (Markdown/MDX)
│   ├── blog/            # Blog posts (Markdown/MDX)
│   └── testimonials/    # Testimonials (JSON)
├── config/
│   └── site.config.ts   # Central site configuration
├── hooks/               # React hooks
│   ├── useMediaQuery.ts
│   ├── useDarkMode.ts
│   └── useInView.ts
├── layouts/
│   └── BaseLayout.astro # Main layout with SEO
├── pages/               # File-based routing
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── privacy.astro
│   ├── terms.astro
│   ├── 404.astro
│   ├── services/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── locations/
│       ├── index.astro
│       └── [slug].astro
├── types/               # TypeScript definitions
│   └── index.ts
└── utils/               # Helper functions
    ├── cn.ts            # Class name utility
    ├── schema.ts        # JSON-LD generators
    ├── seo.ts           # SEO utilities
    └── validation.ts    # Form validation (Zod)
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run Astro type checking |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Component Library

### UI Components

All components support variants, sizes, and are fully accessible:

```tsx
// Button variants: primary, secondary, outline, ghost, accent, destructive
<Button variant="primary" size="lg">Get a Quote</Button>

// Card with hover effect
<Card variant="hover" padding="lg">
  <CardContent>Content here</CardContent>
</Card>

// Form inputs with validation
<Input label="Email" error="Invalid email" />

// Animated section wrapper
<Section size="lg" background="muted" animate>
  Content here
</Section>

// FAQ Accordion
<Accordion items={[{ id: '1', title: 'Question', content: 'Answer' }]} />
```

## SEO Configuration

### Schema Markup

The template automatically generates JSON-LD schema for:

- **LocalBusiness** (Locksmith type for home services)
- **Organization**
- **Service** (for each service page)
- **FAQPage** (when FAQs are present)
- **BreadcrumbList**
- **Article** (for blog posts)

### Meta Tags

All pages include comprehensive meta tags:

- Title with configurable template
- Description
- Canonical URL
- Open Graph tags
- Twitter Card tags
- Robots directives
- Geo meta tags for local SEO

### robots.txt Configuration

The template includes a pre-configured `robots.txt` that:

- Allows all major search engines
- Manages AI crawler access (GPTBot, Claude, etc.)
- Points to sitemap location

## Content Collections

### Adding Services

Create a new file in `src/content/services/`:

```markdown
---
title: "Service Name"
description: "SEO description for the service"
shortDescription: "Brief description for cards"
icon: "home"  # lucide icon name
features:
  - "Feature 1"
  - "Feature 2"
faqs:
  - question: "Common question?"
    answer: "Detailed answer here."
order: 1
draft: false
---

Detailed service content in Markdown...
```

### Adding Locations

Create a new file in `src/content/locations/`:

```markdown
---
name: "City Name"
description: "SEO description for this location"
neighborhoods:
  - "Neighborhood 1"
  - "Neighborhood 2"
zipCodes:
  - "12345"
order: 1
draft: false
---

Location-specific content...
```

## Customization Guide

### Changing Brand Colors

Edit `tailwind.config.mjs`:

```js
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // Main brand color
    600: '#2563eb',
    // ... other shades
  },
}
```

### Updating Business Information

Edit `src/config/site.config.ts`:

```ts
export const siteConfig = {
  name: 'Your Business Name',
  contact: {
    phone: {
      display: '(555) 123-4567',
      href: '+15551234567',
    },
    email: 'info@yourbusiness.com',
  },
  // ... other settings
};
```

## Deployment

### Automated Deployment (Hostinger)

This project uses a dual-repository workflow for automated deployment:

1.  **Source Repository**: This repository contains the source code, components, and configuration.
2.  **Live Repository**: [yaronhayo/royal-locksmith-live](https://github.com/yaronhayo/royal-locksmith-live) contains only the built production assets (`dist/`).

#### How to Deploy Updates

To deploy new changes to the live site:

1.  **Build**: Run `npm run build` locally to generate fresh production assets in the `dist/` folder.
2.  **Sync**: Commit and push the updated contents of the `dist/` folder to the `main` branch of the **Live Repository**.
3.  **Action**: A GitHub Action will automatically trigger, mirroring the files to Hostinger via FTP.

#### Backend Configuration

The PHP backend requires a `.env.php` file in the `public/api/` directory on the server. This file is excluded from the source repository for security. Ensure it is uploaded separately via FTP if the server environment is reset.

## Security Headers

The template includes security headers in `public/_headers`:

- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## Performance Optimizations

- **Static Generation**: All pages are pre-rendered at build time
- **Image Optimization**: Sharp integration for automatic image processing
- **Third-Party Script Isolation**: Partytown for analytics scripts
- **Font Optimization**: Inter font with proper loading strategy
- **CSS Optimization**: Tailwind purging and minification
- **View Transitions**: Smooth page transitions without full reloads

## License

MIT License - feel free to use this template for your projects.

## Support

For questions or issues, please open a GitHub issue.
