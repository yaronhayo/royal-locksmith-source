/**
 * Reviews Grid Component
 * 
 * Displays review cards with progressive reveal "See More" functionality.
 * Shows 12 reviews initially, adds 12 more per click (max 84 total).
 */
import React, { useState } from 'react';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Calendar, BadgeCheck } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ReviewData {
  name: string;
  location: string;
  rating: number;
  service: string;
  text: string;
  date: string;
  verified: boolean;
}

export interface ReviewsGridProps {
  reviews: ReviewData[];
  itemsPerPage?: number;
}

function getStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => i < rating ? 'filled' : 'empty');
}

export const ReviewsGrid: React.FC<ReviewsGridProps> = ({
  reviews,
  itemsPerPage = 12,
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;
  const remainingCount = Math.min(itemsPerPage, reviews.length - visibleCount);
  
  const handleSeeMore = () => {
    setVisibleCount(prev => Math.min(prev + itemsPerPage, reviews.length));
  };

  return (
    <div>
      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleReviews.map((review, index) => (
          <Card key={index} variant="hover" padding="lg" className="h-full">
            <CardContent className="flex h-full flex-col">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.name}</span>
                      {review.verified && (
                        <BadgeCheck className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{review.location}</div>
                  </div>
                </div>
                <Badge variant="secondary" size="sm">
                  {review.service}
                </Badge>
              </div>
              
              {/* Rating */}
              <div className="mb-3 flex items-center gap-1">
                {getStars(review.rating).map((star, i) => (
                  <svg 
                    key={i}
                    className={`h-4 w-4 ${star === 'filled' ? 'fill-warning-500 text-warning-500' : 'fill-muted-foreground/30 text-muted-foreground/30'}`} 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              
              {/* Review Text */}
              <p className="flex-1 text-muted-foreground">
                "{review.text}"
              </p>
              
              {/* Date */}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground" suppressHydrationWarning>
                <Calendar className="h-4 w-4" />
                <span suppressHydrationWarning>{review.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* See More Button */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSeeMore}
            className={cn(
              'group inline-flex items-center gap-2 rounded-xl px-10 py-5',
              'border-2 border-primary bg-primary/5 text-primary',
              'text-lg font-bold transition-all duration-300',
              'hover:bg-primary hover:text-primary-foreground hover:shadow-glow',
              'active:scale-95'
            )}
          >
            <span>See More Reviews</span>
            <span className="rounded-full bg-primary/20 px-3 py-1 text-sm group-hover:bg-white/20">
              +{remainingCount}
            </span>
            <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
      
      {/* Progress indicator */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Showing {visibleReviews.length} of {reviews.length} reviews
      </div>
    </div>
  );
};

export default ReviewsGrid;
