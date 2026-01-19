import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../../utils/cn';
import * as LucideIcons from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  href: string;
  featured?: boolean;
  className?: string;
  transitionName?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconName,
  href,
  featured = false,
  className,
  transitionName,
}) => {
  // Map string icon names to Lucide components
  // e.g., 'home' -> LucideIcons.Home
  const IconComponent = (LucideIcons as any)[
    iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  ] || LucideIcons.Key;

  return (
    <a href={href} className={cn('group block h-full', className)}>
      <Card 
        variant={featured ? 'featured' : 'hover'} 
        padding="none" 
        className="h-full relative overflow-hidden"
        style={{ viewTransitionName: transitionName } as any}
      >
        <CardContent className="h-full p-6">
          {/* Featured badge */}
          {featured && (
            <div className="absolute right-4 top-4">
              <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                Popular
              </span>
            </div>
          )}

          <div className="relative">
            {/* Icon container with gold glow on hover */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow">
              <IconComponent size={28} />
            </div>

            {/* Title */}
            <h3 className="mb-2 text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>

            {/* CTA */}
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2">
              Learn More
              <LucideIcons.ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default ServiceCard;
