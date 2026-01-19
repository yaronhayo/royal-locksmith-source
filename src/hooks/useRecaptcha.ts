/**
 * reCAPTCHA v3 Hook
 * 
 * Provides reCAPTCHA v3 token generation for form submissions.
 * Loads the reCAPTCHA script dynamically and handles token generation.
 */

import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface UseRecaptchaOptions {
  siteKey: string;
  action?: string;
}

interface UseRecaptchaReturn {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  executeRecaptcha: (action?: string) => Promise<string | null>;
}

/**
 * Hook to manage reCAPTCHA v3 integration
 * 
 * @example
 * ```tsx
 * const { executeRecaptcha, isLoaded } = useRecaptcha({
 *   siteKey: 'your-site-key',
 *   action: 'contact_form'
 * });
 * 
 * const handleSubmit = async () => {
 *   const token = await executeRecaptcha();
 *   // Send token to backend for verification
 * };
 * ```
 */
export function useRecaptcha({
  siteKey,
  action = 'submit',
}: UseRecaptchaOptions): UseRecaptchaReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already loaded
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
        setIsLoading(false);
      });
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
        setIsLoading(false);
      });
    };

    script.onerror = () => {
      setError('Failed to load reCAPTCHA. Please refresh the page.');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup not needed - other components might need the script
    };
  }, [siteKey]);

  const executeRecaptcha = useCallback(
    async (customAction?: string): Promise<string | null> => {
      if (!isLoaded || !window.grecaptcha) {
        console.error('reCAPTCHA not loaded');
        return null;
      }

      try {
        const token = await window.grecaptcha.execute(siteKey, {
          action: customAction || action,
        });
        return token;
      } catch (err) {
        console.error('reCAPTCHA execution failed:', err);
        setError('reCAPTCHA verification failed. Please try again.');
        return null;
      }
    },
    [isLoaded, siteKey, action]
  );

  return {
    isLoaded,
    isLoading,
    error,
    executeRecaptcha,
  };
}

export default useRecaptcha;
