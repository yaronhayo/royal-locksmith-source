/**
 * Contact Form Component
 * 
 * Full-featured contact form with:
 * - Google reCAPTCHA v3 protection
 * - Google Places address autocomplete
 * - Client-side validation
 * - PHP backend submission (Hostinger compatible)
 * - Accessible form controls
 */

import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { AddressAutocomplete, type AddressComponents } from '../maps';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { cn } from '../../utils/cn';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  formatPhoneNumber,
} from '../../utils/validation';
import { siteConfig } from '../../config/site.config';
import { LegalModal } from '../ui/LegalModal';

interface ContactFormProps {
  /** reCAPTCHA site key */
  recaptchaSiteKey: string;
  /** Form submission endpoint */
  endpoint?: string;
  /** Service type options */
  serviceOptions?: string[];
  /** Show address field with autocomplete */
  showAddress?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Success callback */
  onSuccess?: () => void;
  /** Error callback */
  onError?: (error: string) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
  addressComponents?: AddressComponents;
  // Honeypot field for bot detection
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  service?: string;
  message?: string;
  consent?: string;
  form?: string;
}

export function ContactForm({
  recaptchaSiteKey,
  endpoint = '/api/contact.php',
  serviceOptions,
  showAddress = true,
  className,
  onSuccess,
  onError,
}: ContactFormProps) {
  // Use service options from props or fall back to site config
  const services = serviceOptions || siteConfig.services.map(s => s.name);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: '',
    website: '', // Honeypot
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const { executeRecaptcha, isLoaded: recaptchaLoaded } = useRecaptcha({
    siteKey: recaptchaSiteKey,
    action: 'contact_form',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }

    // Email is optional - but validate format if provided
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateRequired(formData.phone)) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid US phone number';
    }

    if (!validateRequired(formData.service)) {
      newErrors.service = 'Please select a service';
    }

    // Message is optional - no validation needed

    if (!hasConsented) {
      newErrors.consent = 'Please agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Honeypot check - if filled, silently reject (bot detected)
    if (formData.website) {
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      // Prepare form data
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formatPhoneNumber(formData.phone));
      submitData.append('address', formData.address);
      submitData.append('service', formData.service);
      submitData.append('message', formData.message);
      submitData.append('recaptcha_token', recaptchaToken);
      
      // Include tracking parameters from sessionStorage
      const trackingParamsJson = sessionStorage.getItem('marketing_params');
      if (trackingParamsJson) {
        try {
          const trackingParams = JSON.parse(trackingParamsJson);
          Object.keys(trackingParams).forEach(key => {
            submitData.append(key, trackingParams[key]);
          });
        } catch (e) {
          console.error('[ContactForm] Error parsing tracking params:', e);
        }
      }
      
      // Include address components if available
      if (formData.addressComponents) {
        submitData.append(
          'address_components',
          JSON.stringify(formData.addressComponents)
        );
      }

      // Submit to PHP backend
      const response = await fetch(endpoint, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();


      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message');
      }

      // Success - redirect to thank you page
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        service: '',
        message: '',
        website: '',
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Set flag and redirect to thank-you page
      sessionStorage.setItem('form_submitted', 'true');
      window.location.href = '/thank-you/?type=contact';
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setErrors({ form: errorMessage });
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    const errorField = field as keyof FormErrors;
    if (errors[errorField]) {
      setErrors((prev) => ({ ...prev, [errorField]: undefined }));
    }
  };

  const handleAddressSelect = (components: AddressComponents) => {
    setFormData((prev) => ({
      ...prev,
      address: components.formattedAddress,
      addressComponents: components,
    }));
  };

  if (isSubmitted) {
    return (
      <div className={cn('rounded-xl bg-success-50 p-8 text-center', className)}>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
          <svg
            className="h-8 w-8 text-success-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-success-900">Message Sent!</h3>
        <p className="mt-2 text-success-700">
          Thank you for contacting us. We'll get back to you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      {/* Form Error */}
      {errors.form && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {errors.form}
        </div>
      )}

      {/* Honeypot field - hidden from humans, detected by bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name & Email Row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="John Smith"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          required
          autoComplete="name"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
        />
      </div>

      {/* Phone & Service Row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="(555) 000-0000"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={errors.phone}
          required
          autoComplete="tel"
        />

        <div className="space-y-2">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-foreground"
          >
            Service Needed <span className="text-destructive">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            required
            className={cn(
              'w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              errors.service
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                : 'border-input'
            )}
            aria-invalid={errors.service ? 'true' : 'false'}
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-sm text-destructive">{errors.service}</p>
          )}
        </div>
      </div>

      {/* Address with Autocomplete */}
      {showAddress && (
        <AddressAutocomplete
          name="address"
          label="Service Address"
          placeholder="Enter your address"
          onAddressSelect={handleAddressSelect}
          error={errors.address}
        />
      )}

      {/* Message */}
      <Textarea
        label="Message (optional)"
        name="message"
        placeholder="Please describe your locksmith needs..."
        value={formData.message}
        onChange={(e) => handleInputChange('message', e.target.value)}
        error={errors.message}
        rows={5}
      />

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
          <span className="text-sm text-muted-foreground leading-relaxed">
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

      {/* reCAPTCHA Notice */}
      <p className="text-xs text-muted-foreground">
        Protected by reCAPTCHA
      </p>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !recaptchaLoaded}
      >
        {isSubmitting ? (
          <>
            <svg
              className="mr-2 h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          'Request Free Estimate'
        )}
      </Button>
    </form>

    {/* Legal Modal */}
    <LegalModal
      isOpen={legalModalType !== null}
      onClose={() => setLegalModalType(null)}
      type={legalModalType || 'privacy'}
    />
    </>
  );
}

export default ContactForm;
