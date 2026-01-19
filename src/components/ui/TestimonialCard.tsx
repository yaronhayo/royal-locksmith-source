import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../../utils/cn';
import { Quote } from 'lucide-react';

// Custom StarIcon that properly accepts fill styling
const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg
    className={cn('h-[18px] w-[18px]', filled ? 'fill-primary text-primary' : 'fill-muted text-muted')}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export interface TestimonialCardProps {
  text: string;
  name: string;
  location?: string;
  rating: number;
  service?: string;
  featured?: boolean;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  name,
  location,
  rating,
  service,
  featured = false,
  className,
}) => {
  return (
    <Card 
      variant={featured ? 'featured' : 'hover'} 
      padding="none" 
      className={cn('relative h-full flex flex-col', className)}
    >
      <CardContent className="flex h-full flex-col p-6">
        {/* Quote icon */}
        <div className="absolute right-6 top-6">
          <Quote className="h-10 w-10 text-primary/10" />
        </div>

        {/* Service badge */}
        {service && (
          <div className="mb-3">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {service}
            </span>
          </div>
        )}

        {/* Star rating */}
        <div className="mb-4 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < rating} />
          ))}
        </div>

        {/* Testimonial text */}
        <blockquote className="flex-1 text-muted-foreground italic">
          "{text}"
        </blockquote>

        {/* Author info */}
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="font-semibold truncate">{name}</div>
            {location && (
              <div className="text-sm text-muted-foreground truncate">{location}</div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Featured indicator */}
      {featured && (
        <div className="absolute -top-3 left-6 z-10">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg">
            Featured Review
          </span>
        </div>
      )}
    </Card>
  );
};

export default TestimonialCard;
