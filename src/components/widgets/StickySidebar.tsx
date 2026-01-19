/**
 * Sticky Sidebar Widget Component
 * 
 * A sticky sidebar that contains:
 * - Quick contact form or booking CTA
 * - Trust badges
 * - Phone number
 * - Service area info
 */

import { Card, CardContent } from '../ui';
import { cn } from '../../utils/cn';
import { siteConfig } from '../../config/site.config';

interface StickySidebarProps {
  /** Show quick booking form */
  showBookingCTA?: boolean;
  /** Show trust badges */
  showTrustBadges?: boolean;
  /** Show service areas */
  showServiceAreas?: boolean;
  /** Current service (for context) */
  currentService?: string;
  /** Current location (for context) */
  currentLocation?: string;
  /** Custom CSS classes */
  className?: string;
}

export function StickySidebar({
  showBookingCTA = true,
  showTrustBadges = true,
  showServiceAreas = true,
  currentService,
  currentLocation,
  className,
}: StickySidebarProps) {
  return (
    <aside className={cn('space-y-6', className)}>
      <div className="sticky top-24 space-y-6">
        
        {/* Quick Booking CTA */}
        {showBookingCTA && (
          <Card className="overflow-hidden border-primary">
            <div className="bg-primary px-6 py-4 text-primary-foreground">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Request Service
              </h3>
              <p className="mt-1 text-sm opacity-90">
                Free on-site inspection & estimate
              </p>
            </div>
            <CardContent className="p-6">
              <a
                href="/book/"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Book Now
              </a>
              
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-xs text-muted-foreground">or call us</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              
              <a
                href={`tel:${siteConfig.contact.phone.href}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary/5 px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteConfig.contact.phone.display}
              </a>
              
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {siteConfig.contact.hours}
              </p>
            </CardContent>
          </Card>
        )}
        
        {/* Trust Badges */}
        {showTrustBadges && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Why Choose Us
              </h3>
              
              <ul className="space-y-3">
                {[
                  { icon: 'shield', label: 'Licensed & Insured', sublabel: `License #${siteConfig.trustSignals.licenseNumber}` },
                  { icon: 'award', label: 'Certified Technicians', sublabel: 'Background Checked' },
                  { icon: 'file-text', label: 'Free Estimates', sublabel: 'No Obligation' },
                  { icon: 'check-circle', label: 'Quality Guaranteed', sublabel: 'Satisfaction Promise' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.sublabel}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        {/* Service Areas */}
        {showServiceAreas && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Service Areas
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {siteConfig.locations.slice(0, 5).map((location) => (
                  <a
                    key={location.slug}
                    href={`/locations/${location.slug}/`}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      currentLocation === location.slug
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-muted/50 hover:border-primary hover:text-primary'
                    )}
                  >
                    {location.name}
                  </a>
                ))}
              </div>
              
              <a
                href="/locations/"
                className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View all areas
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </CardContent>
          </Card>
        )}
        
        {/* Services Quick Links */}
        {currentService && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Other Services
              </h3>
              
              <ul className="space-y-2">
                {siteConfig.services
                  .filter(s => s.slug !== currentService)
                  .map((service) => (
                    <li key={service.slug}>
                      <a
                        href={`/services/${service.slug}/`}
                        className="flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-muted"
                      >
                        <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {service.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
      </div>
    </aside>
  );
}

export default StickySidebar;
