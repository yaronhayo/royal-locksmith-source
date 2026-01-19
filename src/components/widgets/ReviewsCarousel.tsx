'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';

interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
  verified?: boolean;
}

interface ReviewsCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  autoScrollInterval?: number;
  className?: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={cn(
          'h-4 w-4',
          i < rating ? 'fill-warning-500 text-warning-500' : 'fill-muted-foreground/30 text-muted-foreground/30'
        )}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="group flex h-full min-w-[300px] max-w-[350px] flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/30 hover:shadow-glow sm:min-w-[320px]">
    {/* Header */}
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{testimonial.name}</span>
            {testimonial.verified && (
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{testimonial.location}</div>
        </div>
      </div>
      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
        {testimonial.service}
      </span>
    </div>

    {/* Rating */}
    <StarRating rating={testimonial.rating} />

    {/* Review Text */}
    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
      "{testimonial.text}"
    </p>

    {/* Date */}
    {testimonial.date && (
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span suppressHydrationWarning>
          {new Date(testimonial.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    )}
  </div>
);

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({
  testimonials,
  title = 'What Our Customers Say',
  subtitle,
  autoScrollInterval = 4000,
  className,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Duplicate testimonials for infinite scroll effect
  const displayTestimonials = [...testimonials, ...testimonials];

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340; // Card width + gap
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  }, [scrollPosition]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || testimonials.length <= 3) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const newPosition = scrollPosition + 340;
        
        if (newPosition >= maxScroll / 2) {
          // Reset to beginning smoothly
          scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
          setScrollPosition(0);
        } else {
          scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
          setScrollPosition(newPosition);
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isPaused, scrollPosition, autoScrollInterval, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className={cn('py-16 lg:py-20', className)}>
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Customer Reviews
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-card p-3 shadow-lg transition-all hover:border-primary hover:text-primary lg:flex"
            aria-label="Previous reviews"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-card p-3 shadow-lg transition-all hover:border-primary hover:text-primary lg:flex"
            aria-label="Next reviews"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          >
            {displayTestimonials.map((testimonial, index) => (
              <ReviewCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <a
            href="/reviews/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-6 py-3 font-semibold transition-all hover:border-primary hover:text-primary hover:shadow-glow"
          >
            View All Reviews
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
