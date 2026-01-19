import { useEffect } from 'react';

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
      
      if (import.meta.env.DEV) {
        console.log('[Tracking] Captured parameters:', mergedParams);
      }
    }
  }, []);

  return null;
}

export default Tracking;
