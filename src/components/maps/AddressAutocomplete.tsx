/**
 * Address Autocomplete Component
 * 
 * Uses Google Places API for address suggestions.
 * Restricts to configured service area for relevance.
 */

/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface AddressAutocompleteProps {
  /** Input name attribute */
  name: string;
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Required field */
  required?: boolean;
  /** Country restriction (ISO 3166-1 Alpha-2) */
  countryRestriction?: string;
  /** Callback when address is selected */
  onAddressSelect?: (address: AddressComponents) => void;
  /** Error message */
  error?: string;
  /** Custom CSS classes */
  className?: string;
  /** Initial value */
  defaultValue?: string;
}

export interface AddressComponents {
  formattedAddress: string;
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export function AddressAutocomplete({
  name,
  label,
  placeholder = 'Enter your address',
  required = false,
  countryRestriction = 'us',
  onAddressSelect,
  error,
  className,
  defaultValue = '',
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null);
  const [value, setValue] = useState(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is loaded
    const checkGoogleMaps = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (win.google?.maps?.places) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    if (checkGoogleMaps()) return;

    // Wait for Google Maps to load
    const interval = setInterval(() => {
      if (checkGoogleMaps()) {
        clearInterval(interval);
      }
    }, 100);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    
    // Initialize autocomplete
    autocompleteRef.current = new win.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: countryRestriction },
        fields: ['address_components', 'formatted_address', 'geometry'],
        types: ['address'],
      }
    );

    // Handle place selection
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      
      if (!place?.address_components) return;

      const addressComponents = parseAddressComponents(place);
      setValue(addressComponents.formattedAddress);
      
      if (onAddressSelect) {
        onAddressSelect(addressComponents);
      }
    });

    return () => {
      if (autocompleteRef.current) {
        win.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, countryRestriction, onAddressSelect]);

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className={cn(
            'w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors',
            'placeholder:text-muted-foreground',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
            error
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
              : 'border-input',
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        
        {/* Location icon */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
      
      {!isLoaded && (
        <p className="text-xs text-muted-foreground">
          Loading address suggestions...
        </p>
      )}
    </div>
  );
}

/**
 * Parse Google Places address components into a structured object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseAddressComponents(place: any): AddressComponents {
  const components: AddressComponents = {
    formattedAddress: place.formatted_address || '',
  };

  if (place.geometry?.location) {
    components.lat = place.geometry.location.lat();
    components.lng = place.geometry.location.lng();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  place.address_components?.forEach((component: any) => {
    const type = component.types[0];
    
    switch (type) {
      case 'street_number':
        components.streetNumber = component.long_name;
        break;
      case 'route':
        components.streetName = component.long_name;
        break;
      case 'locality':
        components.city = component.long_name;
        break;
      case 'administrative_area_level_1':
        components.state = component.short_name;
        break;
      case 'postal_code':
        components.postalCode = component.long_name;
        break;
      case 'country':
        components.country = component.short_name;
        break;
    }
  });

  return components;
}

export default AddressAutocomplete;
