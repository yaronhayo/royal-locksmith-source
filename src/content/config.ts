import { defineCollection, z } from 'astro:content';

// Services Collection - matches company-data schema
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    // Hierarchical service structure
    category: z.enum(['emergency', 'residential', 'commercial', 'automotive']).optional(),
    parentService: z.string().optional(), // Slug of parent service (for sub-services)
    subServices: z.array(z.string()).optional(), // Slugs of child services (for categories)
    features: z.array(z.string()).optional(),
    benefits: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    process: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

// Locations Collection - matches company-data schema
const locations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    services: z.array(z.string()).optional(),
    neighborhoods: z.array(z.string()).optional(),
    zipCodes: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

// Blog Collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    focusKeyword: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
  }),
});

// Testimonials Collection
const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    location: z.string().optional(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    service: z.string().optional(),
    date: z.string().optional(),
    featured: z.boolean().optional().default(false),
    category: z.string().optional(), // Location slug or service slug for filtering
    verified: z.boolean().optional().default(true),
  }),
});

export const collections = {
  services,
  locations,
  blog,
  testimonials,
};
