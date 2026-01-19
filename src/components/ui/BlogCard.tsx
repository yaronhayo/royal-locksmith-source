import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../../utils/cn';
import * as LucideIcons from 'lucide-react';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: Date | string;
  category?: string;
  image?: string;
  readTime?: string;
  featured?: boolean;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  slug,
  date,
  category,
  image,
  readTime,
  featured = false,
  className,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <a href={`/blog/${slug}/`} className={cn('group block h-full', className)}>
      <Card 
        variant={featured ? 'featured' : 'hover'} 
        padding="none" 
        className="h-full overflow-hidden flex flex-col"
      >
        {/* Image Area */}
        {image ? (
          <div className="relative aspect-video overflow-hidden bg-muted">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <LucideIcons.FileText className="h-12 w-12 text-primary/30" strokeWidth={1} />
          </div>
        )}

        {/* Category badge */}
        {category && (
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-lg">
              {category}
            </span>
          </div>
        )}

        {/* Content */}
        <CardContent className="p-5 flex-1 flex flex-col">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1" suppressHydrationWarning>
              <LucideIcons.Calendar size={14} />
              {formattedDate}
            </span>
            {readTime && (
              <span className="flex items-center gap-1">
                <LucideIcons.Clock size={14} />
                {readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-3 font-display text-lg font-bold leading-tight tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
            {excerpt}
          </p>

          {/* Read more */}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2">
            Read Article
            <LucideIcons.ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>

        {/* Featured indicator */}
        {featured && (
          <div className="absolute right-4 top-4 z-10">
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground shadow-lg">
              Featured
            </span>
          </div>
        )}
      </Card>
    </a>
  );
};

export default BlogCard;
