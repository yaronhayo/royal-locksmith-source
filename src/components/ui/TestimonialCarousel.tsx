import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface TestimonialData {
  id: string;
  name: string;
  text: string;
  rating: number;
  location?: string;
  service?: string;
}

export interface TestimonialCarouselProps {
  testimonials: TestimonialData[];
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg
    className={cn('h-5 w-5', filled ? 'fill-primary text-primary' : 'fill-muted text-muted')}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const ChevronIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg
    className={cn('h-6 w-6', direction === 'left' && 'rotate-180')}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const QuoteIcon: React.FC = () => (
  <svg className="h-12 w-12 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
  </svg>
);

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || autoPlayInterval <= 0) return;

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [goToNext, autoPlayInterval, isPaused]);

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main testimonial card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
        {/* Quote icon */}
        <div className="absolute right-6 top-6 md:right-10 md:top-10">
          <QuoteIcon />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Service badge */}
            {currentTestimonial.service && (
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {currentTestimonial.service}
              </span>
            )}

            {/* Star rating */}
            <div className="mb-6 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < currentTestimonial.rating} />
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote className="text-lg text-foreground md:text-xl lg:text-2xl">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Author info */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-semibold">{currentTestimonial.name}</div>
                {currentTestimonial.location && (
                  <div className="text-sm text-muted-foreground">{currentTestimonial.location}</div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {showArrows && testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-3 text-muted-foreground shadow-lg transition-all hover:border-primary hover:text-primary hover:shadow-glow md:-translate-x-full"
            aria-label="Previous testimonial"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border border-border bg-card p-3 text-muted-foreground shadow-lg transition-all hover:border-primary hover:text-primary hover:shadow-glow md:translate-x-full"
            aria-label="Next testimonial"
          >
            <ChevronIcon direction="right" />
          </button>
        </>
      )}

      {/* Dots navigation */}
      {showDots && testimonials.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2.5 rounded-full transition-all',
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-border hover:bg-primary/50'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {!isPaused && autoPlayInterval > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
          <motion.div
            key={currentIndex}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
            className="h-full bg-primary/30"
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
