/**
 * Service Area Map Component
 * 
 * Displays an interactive Google Map showing service coverage areas.
 * Uses Google Maps JavaScript API with polygon overlays for service areas.
 * 
 * For SAB compliance: Shows service AREA, not a specific business location.
 */

/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface ServiceAreaMapProps {
  /** Google Maps API key */
  apiKey: string;
  /** Center coordinates for the map */
  center: { lat: number; lng: number };
  /** Zoom level (default: 10 for city-level view) */
  zoom?: number;
  /** Service area locations to highlight */
  serviceAreas?: Array<{
    name: string;
    coordinates: { lat: number; lng: number };
  }>;
  /** Custom CSS classes */
  className?: string;
  /** Map height */
  height?: string;
}

export function ServiceAreaMap({
  apiKey,
  center,
  zoom = 10,
  serviceAreas = [],
  className,
  height = '400px',
}: ServiceAreaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    
    // Helper to check if Google Maps is fully loaded (including Map constructor)
    const isGoogleMapsReady = () => {
      return !!(win.google?.maps?.Map && typeof win.google.maps.Map === 'function');
    };
    
    // Check if Google Maps is already fully loaded
    if (isGoogleMapsReady()) {
      setIsLoaded(true);
      return;
    }

    // Set up callback for when script loads
    win.initServiceAreaMap = () => {
      // Double-check that Map constructor is available
      if (isGoogleMapsReady()) {
        setIsLoaded(true);
      } else {
        // If not ready yet, poll until it is
        const readyCheck = setInterval(() => {
          if (isGoogleMapsReady()) {
            setIsLoaded(true);
            clearInterval(readyCheck);
          }
        }, 50);
        setTimeout(() => clearInterval(readyCheck), 5000);
      }
    };

    // Check if script is already being loaded (e.g., by Astro page)
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      // Wait for existing script to fully load including Map constructor
      const checkInterval = setInterval(() => {
        if (isGoogleMapsReady()) {
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      
      setTimeout(() => clearInterval(checkInterval), 10000);
      return;
    }

    // Load Google Maps script ourselves
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=initServiceAreaMap`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      setError('Failed to load Google Maps. Please check your API key.');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup callback
      delete win.initServiceAreaMap;
    };
  }, [apiKey]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const google = win.google;

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: getMapStyles(),
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    // Add service area markers (circles, not pins - SAB compliant)
    serviceAreas.forEach((area) => {
      // Add a circle to represent service area coverage
      new google.maps.Circle({
        strokeColor: '#eca413', // Gold brand color
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#eca413',
        fillOpacity: 0.15,
        map,
        center: area.coordinates,
        radius: 8000, // 8km radius - adjust as needed
      });

      // Add area label
      new google.maps.Marker({
        position: area.coordinates,
        map,
        title: area.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#eca413',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        label: {
          text: area.name,
          color: '#1f2937',
          fontSize: '12px',
          fontWeight: 'bold',
          className: 'map-label',
        },
      });
    });

  }, [isLoaded, center, zoom, serviceAreas]);

  if (error) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center rounded-xl bg-muted text-muted-foreground',
          className
        )}
        style={{ height }}
      >
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-muted"
          style={{ height }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading map...</span>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full"
        style={{ height }}
        aria-label="Service area map"
      />
    </div>
  );
}

/**
 * Custom map styles for a clean, professional look
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMapStyles(): any[] {
  return [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9e9e9e' }],
    },
  ];
}

export default ServiceAreaMap;
