/**
 * Web Vitals Tracking Component
 * 
 * Monitors Core Web Vitals (LCP, FID, CLS, FCP, TTFB) and reports them.
 * These metrics directly impact SEO rankings.
 * 
 * Usage: Add <WebVitals client:load /> to your BaseLayout
 */
import { useEffect } from 'react';

// Threshold values for "good" performance (Google recommendations)
const thresholds = {
  LCP: 2500,  // Largest Contentful Paint (ms)
  FID: 100,   // First Input Delay (ms)
  CLS: 0.1,   // Cumulative Layout Shift (score)
  FCP: 1800,  // First Contentful Paint (ms)
  TTFB: 800,  // Time to First Byte (ms)
  INP: 200,   // Interaction to Next Paint (ms)
};

type MetricName = 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'INP';

interface WebVitalsProps {
  /** Enable console logging of metrics (development only) */
  debug?: boolean;
  /** Callback to send metrics to analytics */
  onVitals?: (metric: { name: MetricName; value: number; rating: 'good' | 'needs-improvement' | 'poor' }) => void;
}

function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[name];
  if (name === 'CLS') {
    // CLS uses different thresholds
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }
  
  if (value <= threshold) return 'good';
  if (value <= threshold * 2) return 'needs-improvement';
  return 'poor';
}

export function WebVitals({ debug = false, onVitals }: WebVitalsProps) {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const reportMetric = (name: MetricName, value: number) => {
      const rating = getRating(name, value);
      
      if (debug) {
        const color = rating === 'good' ? '#0cce6b' : rating === 'needs-improvement' ? '#ffa400' : '#ff4e42';
        console.log(
          `%c[Web Vitals] ${name}: ${name === 'CLS' ? value.toFixed(3) : Math.round(value)}ms (${rating})`,
          `color: ${color}; font-weight: bold;`
        );
      }
      
      // Report to callback
      onVitals?.({ name, value, rating });
      
      // Push to dataLayer for GTM (if available)
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'web_vitals',
          web_vitals_name: name,
          web_vitals_value: value,
          web_vitals_rating: rating,
        });
      }
    };

    // Use web-vitals library if available, otherwise use native APIs
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry) {
              reportMetric('LCP', lastEntry.startTime);
            }
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
          // LCP not supported
        }
      }
    };

    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find((e) => e.name === 'first-contentful-paint');
            if (fcpEntry) {
              reportMetric('FCP', fcpEntry.startTime);
            }
          });
          observer.observe({ type: 'paint', buffered: true });
        } catch (e) {
          // FCP not supported
        }
      }
    };

    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        try {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
          });
          observer.observe({ type: 'layout-shift', buffered: true });
          
          // Report CLS when page is hidden
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
              reportMetric('CLS', clsValue);
            }
          });
        } catch (e) {
          // CLS not supported
        }
      }
    };

    const observeTTFB = () => {
      if ('performance' in window) {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (nav) {
          reportMetric('TTFB', nav.responseStart - nav.requestStart);
        }
      }
    };

    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries() as any[];
            const firstInput = entries[0];
            if (firstInput) {
              reportMetric('FID', firstInput.processingStart - firstInput.startTime);
            }
          });
          observer.observe({ type: 'first-input', buffered: true });
        } catch (e) {
          // FID not supported
        }
      }
    };

    // Start observing
    observeLCP();
    observeFCP();
    observeCLS();
    observeTTFB();
    observeFID();

  }, [debug, onVitals]);

  // This component doesn't render anything
  return null;
}

export default WebVitals;
