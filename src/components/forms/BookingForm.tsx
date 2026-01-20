/**
 * Booking Form Component
 * 
 * Comprehensive booking form with:
 * - Service selection
 * - Date and time preferences
 * - Address autocomplete
 * - reCAPTCHA protection
 * - Validation and error handling
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

interface BookingFormProps {
  recaptchaSiteKey: string;
  endpoint?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  urgency: string;
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
  preferredDate?: string;
  preferredTime?: string;
  urgency?: string;
  message?: string;
  consent?: string;
  form?: string;
}

const timeSlots = [
  'Morning (8am - 12pm)',
  'Afternoon (12pm - 5pm)',
  'Evening (5pm - 8pm)',
  'Flexible / Any Time',
];

const urgencyOptions = [
  { value: 'standard', label: 'Standard - Within a few days' },
  { value: 'soon', label: 'Soon - Within 24-48 hours' },
  { value: 'urgent', label: 'Urgent - As soon as possible' },
];

export function BookingForm({
  recaptchaSiteKey,
  endpoint = '/api/contact.php',
  className,
  onSuccess,
  onError,
}: BookingFormProps) {
  const services = siteConfig.services.map(s => s.name);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    urgency: 'standard',
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
    action: 'booking_form',
  });

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

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

    if (!validateRequired(formData.address)) {
      newErrors.address = 'Service address is required';
    }

    if (!validateRequired(formData.service)) {
      newErrors.service = 'Please select a service';
    }

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

    // Honeypot check - if filled, silently reject (bot detected)
    if (formData.website) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const recaptchaToken = await executeRecaptcha('booking_form');
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'addressComponents') {
          submitData.append(key, JSON.stringify(value));
        } else if (key === 'phone') {
          submitData.append(key, formatPhoneNumber(value as string));
        } else {
          submitData.append(key, value as string);
        }
      });
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
          console.error('[BookingForm] Error parsing tracking params:', e);
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit booking request');
      }

      setIsSubmitted(true);
      
      // Push form submission event to GTM dataLayer
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_submit_success',
          form_type: 'booking_form',
          service_type: formData.service || 'General Service',
          form_location: window.location.pathname,
        });
      }
      
      // Set flag and redirect to thank you page
      sessionStorage.setItem('form_submitted', 'true');
      window.location.href = '/thank-you/?type=booking';
      
      if (onSuccess) {
        onSuccess();
      }
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn('rounded-xl bg-success-50 p-8 text-center', className)}>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
          <svg className="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-success-900">Booking Request Submitted!</h3>
        <p className="mt-2 text-success-700">
          Thank you! We'll contact you shortly to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <>
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)} noValidate>
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

      {/* Contact Information */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>
          Contact Information
        </h3>
        
        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>

        <div className="mt-4">
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
      </div>

      {/* Service Details */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>
          Service Details
        </h3>

        <div className="space-y-2">
          <label htmlFor="service" className="block text-sm font-medium text-foreground">
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
              errors.service ? 'border-destructive' : 'border-input'
            )}
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
        </div>

        <div className="mt-4">
          <AddressAutocomplete
            name="address"
            label="Service Address"
            placeholder="Enter the address where service is needed"
            required
            onAddressSelect={handleAddressSelect}
            error={errors.address}
          />
        </div>
      </div>

      {/* Scheduling Preferences */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
          Scheduling Preferences
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground">
              Preferred Date
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              min={today}
              value={formData.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredTime" className="block text-sm font-medium text-foreground">
              Preferred Time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={(e) => handleInputChange('preferredTime', e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select preferred time...</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-foreground">
            How urgent is your request?
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {urgencyOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                  formData.urgency === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-input hover:border-primary/50'
                )}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="h-4 w-4 text-primary"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</span>
          Additional Information
        </h3>

        <Textarea
          label="Describe your locksmith needs"
          name="message"
          placeholder="Please provide any additional details about your situation, such as the type of lock, specific issues, or any other relevant information..."
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={4}
        />
      </div>

      {/* reCAPTCHA Notice */}
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
            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Booking Request'
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

export default BookingForm;
