/**
 * Phone CTA Widget
 * 
 * Sticky phone call-to-action button for mobile devices.
 * Provides easy access to call the business.
 */

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { siteConfig } from '../../config/site.config';

interface PhoneCTAProps {
  /** Position on screen */
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  /** Custom CSS classes */
  className?: string;
  /** Show on desktop too */
  showOnDesktop?: boolean;
}

export function PhoneCTA({ 
  position = 'bottom-left',
  className,
  showOnDesktop = false,
}: PhoneCTAProps) {
  const positionClasses = {
    'bottom-left': 'left-6',
    'bottom-center': 'left-1/2 -translate-x-1/2',
    'bottom-right': 'right-20', // Offset for scroll-to-top button
  };

  return (
    <motion.a
      href={`tel:${siteConfig.contact.phone.href}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.3 }}
      className={cn(
        'fixed bottom-6 z-40',
        positionClasses[position],
        'flex items-center gap-3',
        'rounded-full bg-primary px-5 py-3 shadow-xl',
        'text-primary-foreground',
        'transition-all hover:bg-primary/90 hover:shadow-2xl hover:scale-105',
        !showOnDesktop && 'lg:hidden',
        className
      )}
      aria-label={`Call ${siteConfig.contact.phone.display}`}
    >
      {/* Pulsing ring animation */}
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75"></span>
        <svg 
          className="relative h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={2}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
          />
        </svg>
      </span>
      
      <div className="hidden sm:block">
        <div className="text-sm font-bold">{siteConfig.contact.phone.display}</div>
        <div className="text-xs opacity-80">Free Estimates</div>
      </div>
    </motion.a>
  );
}

export default PhoneCTA;
