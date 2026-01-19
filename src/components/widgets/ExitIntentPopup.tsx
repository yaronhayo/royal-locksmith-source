'use client';

import { useState, useEffect } from 'react';
import { X, Phone, Calendar, Gift } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExitIntentPopupProps {
  /** Custom trigger delay in ms (0 = pure exit intent) */
  delay?: number;
  /** Storage key to prevent repeat shows */
  storageKey?: string;
  /** Days before showing again after close */
  cooldownDays?: number;
  /** Phone number to display */
  phone?: string;
  /** Phone href for calling */
  phoneHref?: string;
  /** Booking page URL */
  bookingUrl?: string;
  className?: string;
}

export function ExitIntentPopup({
  delay = 0,
  storageKey = 'exit-intent-shown',
  cooldownDays = 7,
  phone = '(201) 748-2070',
  phoneHref = '+12017482070',
  bookingUrl = '/book/',
  className,
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if should show (cooldown period)
    const lastShown = localStorage.getItem(storageKey);
    if (lastShown) {
      const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSince < cooldownDays) {
        setHasTriggered(true); // Skip showing
        return;
      }
    }

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered) return;
      
      // Only trigger when mouse leaves at top of viewport
      if (e.clientY < 10) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    // Optional delay-based trigger
    let delayTimer: NodeJS.Timeout;
    if (delay > 0) {
      delayTimer = setTimeout(() => {
        if (!hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      }, delay);
    }

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [delay, storageKey, cooldownDays, hasTriggered]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, Date.now().toString());
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300",
          className
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary via-primary to-primary-600 px-6 py-8 text-center text-white">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Gift className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold">Wait! Before You Go...</h3>
          <p className="mt-2 text-white/80">
            Get a <strong>FREE security assessment</strong> for your home or business
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Phone CTA */}
            <a
              href={`tel:${phoneHref}`}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now: {phone}</span>
            </a>

            {/* Book online */}
            <a
              href={bookingUrl}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-muted/50 px-6 py-4 font-semibold transition-all hover:border-primary hover:bg-muted"
            >
              <Calendar className="h-5 w-5" />
              <span>Schedule Service Online</span>
            </a>
          </div>

          {/* Trust badge */}
          <div className="mt-6 flex items-center justify-center gap-4 text-center text-sm text-muted-foreground">
            <span>✓ Licensed & Insured</span>
            <span>•</span>
            <span>✓ No Obligation</span>
          </div>

          {/* Dismiss link */}
          <button
            onClick={handleClose}
            className="mt-4 w-full text-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            No thanks, I'll figure it out myself
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitIntentPopup;
