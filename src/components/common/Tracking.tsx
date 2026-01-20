/* eslint-env browser */
import { useEffect } from 'react';

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Tracking component to capture URL parameters (UTM, GCLID) 
 * and store them in sessionStorage for lead attribution.
 */
export function Tracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const trackingParams = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'gclid',
      'fbclid'
    ];

    const capturedParams: Record<string, string> = {};
    let hasNewParams = false;

    trackingParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        capturedParams[param] = value;
        hasNewParams = true;
      }
    });

    if (hasNewParams) {
      // Get existing parameters from sessionStorage
      const existingParamsJson = sessionStorage.getItem('marketing_params');
      const existingParams = existingParamsJson ? JSON.parse(existingParamsJson) : {};

      // Merge new parameters with existing ones
      const mergedParams = { ...existingParams, ...capturedParams };
      
      sessionStorage.setItem('marketing_params', JSON.stringify(mergedParams));
      
      // Push to GTM dataLayer for all scripts (Analytics, Ads, Clarity, etc.)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'marketing_params_captured',
        ...mergedParams,
        // Flatten for GTM Variable access
        utm_source: mergedParams.utm_source || '',
        utm_medium: mergedParams.utm_medium || '',
        utm_campaign: mergedParams.utm_campaign || '',
        utm_content: mergedParams.utm_content || '',
        utm_term: mergedParams.utm_term || '',
        gclid: mergedParams.gclid || '',
        fbclid: mergedParams.fbclid || '',
      });
      
      if (import.meta.env.DEV) {
        console.log('[Tracking] Captured parameters:', mergedParams);
      }
    }
    
    // Always push page view data to dataLayer on mount
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_loaded',
      page_path: window.location.pathname,
      page_url: window.location.href,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return null;
}

export default Tracking;
