'use client';

import { useState, useCallback } from 'react';
import { Calculator, Phone, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  factors?: { label: string; addPrice: number }[];
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'lockout-home',
    name: 'Home Lockout',
    basePrice: 85,
    description: 'Standard residential lockout service',
    factors: [
      { label: 'After hours (before 7am or after 8pm)', addPrice: 25 },
      { label: 'High-security lock', addPrice: 35 },
    ],
  },
  {
    id: 'lockout-car',
    name: 'Car Lockout',
    basePrice: 75,
    description: 'Vehicle lockout service (most makes)',
    factors: [
      { label: 'After hours service', addPrice: 25 },
      { label: 'Luxury/high-security vehicle', addPrice: 40 },
    ],
  },
  {
    id: 'rekey',
    name: 'Lock Rekeying',
    basePrice: 25,
    description: 'Per lock, change to new key',
    factors: [
      { label: 'High-security cylinder', addPrice: 20 },
      { label: 'Master key system setup', addPrice: 50 },
    ],
  },
  {
    id: 'new-lock',
    name: 'New Lock Installation',
    basePrice: 65,
    description: 'Labor only, lock hardware separate',
    factors: [
      { label: 'Deadbolt installation', addPrice: 25 },
      { label: 'Smart lock programming', addPrice: 45 },
    ],
  },
  {
    id: 'car-key',
    name: 'Car Key Replacement',
    basePrice: 150,
    description: 'Basic transponder key cut & programmed',
    factors: [
      { label: 'Smart key / proximity fob', addPrice: 100 },
      { label: 'All keys lost (key extraction)', addPrice: 75 },
    ],
  },
];

interface ServiceCalculatorProps {
  phone?: string;
  phoneHref?: string;
  className?: string;
}

export function ServiceCalculator({
  phone = '(201) 748-2070',
  phoneHref = '+12017482070',
  className,
}: ServiceCalculatorProps) {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const service = serviceOptions.find(s => s.id === selectedService);

  const calculateTotal = useCallback(() => {
    if (!service) return 0;
    
    const factorCost = selectedFactors.reduce((sum, factorLabel) => {
      const factor = service.factors?.find(f => f.label === factorLabel);
      return sum + (factor?.addPrice || 0);
    }, 0);

    return (service.basePrice + factorCost) * quantity;
  }, [service, selectedFactors, quantity]);

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedFactors([]);
    setQuantity(1);
  };

  const toggleFactor = (factorLabel: string) => {
    setSelectedFactors(prev =>
      prev.includes(factorLabel)
        ? prev.filter(f => f !== factorLabel)
        : [...prev, factorLabel]
    );
  };

  const total = calculateTotal();

  return (
    <div className={cn(
      "rounded-2xl border border-border bg-card shadow-lg overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-600 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Service Cost Estimator</h3>
            <p className="text-sm text-white/80">Get an instant estimate</p>
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 space-y-5">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Service Type
          </label>
          <select
            value={selectedService}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="">Choose a service...</option>
            {serviceOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name} — from ${option.basePrice}
              </option>
            ))}
          </select>
        </div>

        {/* Service Details */}
        {service && (
          <>
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <p className="mt-1 font-semibold text-primary">
                Base price: ${service.basePrice}
              </p>
            </div>

            {/* Quantity */}
            {(service.id === 'rekey' || service.id === 'new-lock') && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Locks
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Additional Factors */}
            {service.factors && service.factors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Options
                </label>
                <div className="space-y-2">
                  {service.factors.map(factor => (
                    <label
                      key={factor.label}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all",
                        selectedFactors.includes(factor.label)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedFactors.includes(factor.label)}
                          onChange={() => toggleFactor(factor.label)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{factor.label}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        +${factor.addPrice}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Total */}
            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Estimated Total:</span>
                <span className="text-3xl font-bold text-primary">${total}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <HelpCircle className="h-3 w-3" />
                Final price confirmed on-site. No hidden fees.
              </p>
            </div>
          </>
        )}

        {/* CTA */}
        <a
          href={`tel:${phoneHref}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
        >
          <Phone className="h-5 w-5" />
          Call for Exact Quote: {phone}
        </a>
      </div>

      {/* Expandable Disclaimer */}
      <div className="border-t border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between px-6 py-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <span>Pricing Notes</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {isExpanded && (
          <div className="px-6 pb-4 text-xs text-muted-foreground space-y-1">
            <p>• Estimates are for planning purposes only</p>
            <p>• Actual price may vary based on specific circumstances</p>
            <p>• Hardware/parts costs are separate unless noted</p>
            <p>• We provide exact quotes before any work begins</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceCalculator;
