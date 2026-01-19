/**
 * Hero Booking Form Component
 * 
 * Compact booking form designed for hero sections.
 * Optimized for conversion with minimal fields.
 * Now properly wired to API with reCAPTCHA protection.
 */

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { siteConfig } from '../../config/site.config';
import { validatePhone, validateRequired, formatPhoneNumber } from '../../utils/validation';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { LegalModal } from '../ui/LegalModal';

interface HeroBookingFormProps {
  /** reCAPTCHA site key */
  recaptchaSiteKey: string;
  /** Form submission endpoint */
  endpoint?: string;
  /** Pre-selected service */
  defaultService?: string;
  /** Pre-selected location */
  defaultLocation?: string;
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Custom CSS classes */
  className?: string;
  /** Compact mode (fewer fields) */
  compact?: boolean;
}

interface FormData {
  name: string;
  phone: string;
  service: string;
  message: string;
  // Honeypot field for bot detection
  website: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  consent?: string;
  form?: string;
}

export function HeroBookingForm({
  recaptchaSiteKey,
  endpoint = '/api/contact.php',
  defaultService = '',
  defaultLocation = '',
  title = 'Request a Free Estimate',
  subtitle = 'Fill out the form and we\'ll contact you shortly',
  className,
  compact = false,
}: HeroBookingFormProps) {
  // Use defaultLocation in hidden field or for analytics
  const locationContext = defaultLocation;
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: defaultService,
    message: locationContext ? `Location: ${locationContext}` : '',
    website: '', // Honeypot
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const { executeRecaptcha, isLoaded: recaptchaLoaded } = useRecaptcha({
    siteKey: recaptchaSiteKey,
    action: 'hero_booking_form',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Required';
    }

    if (!validateRequired(formData.phone)) {
      newErrors.phone = 'Required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone';
    }

    if (!validateRequired(formData.service)) {
      newErrors.service = 'Select service';
    }

    if (!hasConsented) {
      newErrors.consent = 'Please agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Honeypot check - if filled, silently reject (bot detected)
    if (formData.website) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('hero_booking_form');
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      // Prepare form data for submission
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', ''); // Optional for hero form
      submitData.append('phone', formatPhoneNumber(formData.phone));
      submitData.append('address', locationContext);
      submitData.append('service', formData.service);
      submitData.append('message', formData.message || `Quick booking request from hero form`);
      submitData.append('recaptcha_token', recaptchaToken);
      submitData.append('form_source', 'hero_booking');

      // Include tracking parameters from sessionStorage
      const trackingParamsJson = sessionStorage.getItem('marketing_params');
      if (trackingParamsJson) {
        try {
          const trackingParams = JSON.parse(trackingParamsJson);
          Object.keys(trackingParams).forEach(key => {
            submitData.append(key, trackingParams[key]);
          });
        } catch (e) {
          console.error('[HeroBookingForm] Error parsing tracking params:', e);
        }
      }

      // Submit to PHP backend
      const response = await fetch(endpoint, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit booking request');
      }

      setIsSubmitted(true);
      
      // Set flag and redirect to thank you page
      sessionStorage.setItem('form_submitted', 'true');
      setTimeout(() => {
        window.location.href = '/thank-you/?type=booking';
      }, 1500);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'rounded-2xl bg-card p-8 text-center shadow-2xl',
          className
        )}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 dark:bg-success-900/30">
          <svg className="h-8 w-8 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Request Submitted!</h3>
        <p className="mt-2 text-muted-foreground">
          We'll call you shortly to confirm.
        </p>
      </motion.div>
    );
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={cn(
        'rounded-2xl bg-card p-6 shadow-2xl lg:p-8',
        className
      )}
    >
      <div className="mb-6 text-center">
        <p className="text-xl font-bold lg:text-2xl" role="heading" aria-level={2}>{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Form Error */}
        {errors.form && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {errors.form}
          </div>
        )}

        {/* Honeypot field - hidden from humans, detected by bots */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Your Name *"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={cn(
              'w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors',
              'placeholder:text-muted-foreground',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              errors.name ? 'border-destructive' : 'border-input'
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={cn(
              'w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors',
              'placeholder:text-muted-foreground',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              errors.phone ? 'border-destructive' : 'border-input'
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <select
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            aria-label="Select service type"
            className={cn(
              'w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              errors.service ? 'border-destructive' : 'border-input',
              !formData.service && 'text-muted-foreground'
            )}
          >
            <option value="">Select Service *</option>
            {siteConfig.services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-xs text-destructive">{errors.service}</p>
          )}
        </div>

        {/* Message (optional, non-compact only) */}
        {!compact && (
          <div>
            <textarea
              placeholder="Describe your needs (optional)"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}

        {/* Consent Checkbox */}
        <div className="space-y-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={hasConsented}
              onChange={(e) => {
                setHasConsented(e.target.checked);
                if (errors.consent) {
                  setErrors(prev => ({ ...prev, consent: undefined }));
                }
              }}
              className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              I agree to be contacted regarding my request and accept the{' '}
              <button
                type="button"
                onClick={() => setLegalModalType('privacy')}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => setLegalModalType('terms')}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Terms & Conditions
              </button>
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-destructive ml-7">{errors.consent}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !recaptchaLoaded}
          className={cn(
            'w-full rounded-lg bg-primary px-6 py-4 font-semibold text-primary-foreground',
            'transition-all hover:bg-primary/90',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-70'
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            'Get Free Estimate'
          )}
        </button>

        {/* Or Call */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border"></div>
          <span className="text-xs text-muted-foreground">or call now</span>
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

        {/* reCAPTCHA Notice */}
        <p className="text-center text-xs text-muted-foreground">
          Protected by reCAPTCHA
        </p>
      </form>

      {/* Trust indicators */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Free Estimates
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Licensed & Insured
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          No Obligation
        </span>
      </div>
    </motion.div>

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModalType !== null}
        onClose={() => setLegalModalType(null)}
        type={legalModalType || 'privacy'}
      />
    </>
  );
}

export default HeroBookingForm;
