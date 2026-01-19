import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.royallocksmithnj.com',
  
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      filter: (page) => !page.includes('/admin/'),
      // Custom priority based on page type for better GSC crawl prioritization
      serialize(item) {
        // Homepage - highest priority
        if (item.url === 'https://www.royallocksmithnj.com/' || item.url === 'https://www.royallocksmithnj.com') {
          item.priority = 1.0;
        }
        // Service index page
        else if (item.url.match(/\/services\/$/)) {
          item.priority = 0.9;
        }
        // Main service categories (no sub-path after /services/category/)
        else if (item.url.match(/\/services\/(residential|commercial|automotive|emergency)\/$/)) {
          item.priority = 0.9;
        }
        // Service sub-pages
        else if (item.url.includes('/services/')) {
          item.priority = 0.8;
        }
        // Location index page
        else if (item.url.match(/\/locations\/$/)) {
          item.priority = 0.8;
        }
        // Individual location pages
        else if (item.url.includes('/locations/')) {
          item.priority = 0.7;
        }
        // Blog pages
        else if (item.url.includes('/blog/')) {
          item.priority = 0.7;
        }
        // Important static pages
        else if (item.url.match(/\/(about|contact|reviews|faq|book)\/$/)) {
          item.priority = 0.6;
        }
        // Legal/utility pages
        else if (item.url.match(/\/(privacy|terms|accessibility|thank-you)\/$/)) {
          item.priority = 0.3;
        }
        // Default
        else {
          item.priority = 0.5;
        }
        return item;
      },
    }),
    react(),
    mdx(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon({
      include: {
        lucide: ['*'],
        mdi: ['*'],
      },
    }),
    // Compress must be last to process output after all other integrations
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyCSS: true,
          minifyJS: true,
        },
      },
      Image: false, // Using Sharp for image optimization instead
      JavaScript: true,
      SVG: true,
    }),
  ],

  output: 'static',
  
  trailingSlash: 'always',
  
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: [],
    remotePatterns: [],
  },

  vite: {
    build: {
      // Using default CSS minifier (esbuild) - lightningcss was stripping Tailwind responsive classes
    },
    ssr: {
      noExternal: ['@fontsource/inter'],
    },
  },

  experimental: {
    clientPrerender: true,
  },
});
