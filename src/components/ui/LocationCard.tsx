import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../../utils/cn';
import { MapPin, ChevronRight } from 'lucide-react';

export interface LocationCardProps {
  name: string;
  slug: string;
  description?: string;
  isHeadquarters?: boolean;
  neighborhoods?: string[];
  className?: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  name,
  slug,
  description,
  isHeadquarters = false,
  neighborhoods = [],
  className,
}) => {
  return (
    <a href={`/locations/${slug}/`} className={cn('group block w-full', className)}>
      <Card 
        variant={isHeadquarters ? 'featured' : 'hover'} 
        padding="none" 
        className="h-full relative overflow-hidden"
      >
        <CardContent className="flex items-start gap-4 p-5">
          {/* Icon container with gold glow on hover */}
          <div className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary transition-all duration-300',
            'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow'
          )}>
            <MapPin size={24} />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold group-hover:text-primary transition-colors">{name}</h3>
              {isHeadquarters && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Primary Area
                </span>
              )}
            </div>
            
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">
                {isHeadquarters ? 'Primary Service Area' : 'We Serve This Area'}
              </p>
            )}

            {/* Neighborhoods preview */}
            {neighborhoods.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {neighborhoods.slice(0, 3).map((neighborhood, i) => (
                  <span
                    key={i}
                    className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {neighborhood}
                  </span>
                ))}
                {neighborhoods.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{neighborhoods.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
            <ChevronRight size={20} />
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default LocationCard;
