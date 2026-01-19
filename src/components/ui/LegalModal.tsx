/**
 * Legal Modal Component
 * 
 * Modal that displays Privacy Policy or Terms & Conditions
 * Used by consent checkboxes to let users read legal docs without leaving the form.
 * Fetches actual page content and displays just the text in a clean popup.
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LegalModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Type of legal document */
  type: 'privacy' | 'terms';
  /** Custom CSS classes */
  className?: string;
}

// Static content for legal pages (used as fallback or primary source)
const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information We Collect',
        content: 'We collect information you provide directly to us, such as when you fill out a contact form, request a service, or communicate with us. This may include your name, email address, phone number, and physical address.'
      },
      {
        heading: 'How We Use Your Information',
        content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you about your service requests, and to send you promotional communications (with your consent).'
      },
      {
        heading: 'Information Sharing',
        content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law.'
      },
      {
        heading: 'Data Security',
        content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
      },
      {
        heading: 'Cookies and Tracking',
        content: 'We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors come from.'
      },
      {
        heading: 'Your Rights',
        content: 'You have the right to access, update, or delete your personal information. Contact us if you wish to exercise any of these rights.'
      },
      {
        heading: 'Contact Us',
        content: 'If you have any questions about this Privacy Policy, please contact us using the information provided on our website.'
      }
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      {
        heading: 'Acceptance of Terms',
        content: 'By accessing or using our services, you agree to be bound by these Terms & Conditions and our Privacy Policy.'
      },
      {
        heading: 'Services',
        content: 'Royal Locksmith provides professional locksmith services including residential, commercial, automotive, and emergency locksmith solutions throughout New Jersey.'
      },
      {
        heading: 'Service Estimates',
        content: 'All service estimates are provided free of charge. Final pricing may vary based on the complexity of the job and parts required. We will always communicate any changes before proceeding.'
      },
      {
        heading: 'Payment',
        content: 'Payment is due upon completion of services. We accept all major credit cards and cash. A receipt will be provided for all transactions.'
      },
      {
        heading: 'Warranty',
        content: 'We stand behind our work. All labor is warranted for a period of 90 days from the date of service. Parts warranties vary by manufacturer.'
      },
      {
        heading: 'Liability',
        content: 'While we take every precaution to protect your property, we are not liable for pre-existing conditions or damage not caused by our technicians.'
      },
      {
        heading: 'Cancellation',
        content: 'You may cancel a service request at any time before work begins without penalty. Emergency cancellations may be subject to a service call fee.'
      },
      {
        heading: 'Changes to Terms',
        content: 'We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.'
      }
    ]
  }
};

export function LegalModal({
  isOpen,
  onClose,
  type,
  className,
}: LegalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const content = legalContent[type];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap - focus modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={cn(
                'pointer-events-auto',
                'w-full max-w-2xl max-h-[80vh]',
                'flex flex-col',
                'rounded-2xl bg-card shadow-2xl border border-border',
                'overflow-hidden',
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-modal-title"
              tabIndex={-1}
            >
              {/* Header */}
              <div className="flex-shrink-0 flex items-center justify-between border-b border-border px-6 py-4 bg-muted/50">
                <h2 
                  id="legal-modal-title" 
                  className="text-xl font-bold text-foreground"
                >
                  {content.title}
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 bg-background">
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Last updated: January 2026
                  </p>
                  
                  {content.sections.map((section, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {section.heading}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {section.content}
                      </p>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      For questions about these {type === 'privacy' ? 'policies' : 'terms'}, 
                      please contact us at{' '}
                      <a href="tel:+12017482070" className="text-primary hover:underline">
                        (201) 748-2070
                      </a>
                      {' '}or visit our{' '}
                      <a href="/contact/" className="text-primary hover:underline">
                        contact page
                      </a>.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex-shrink-0 border-t border-border px-6 py-4 bg-muted/50">
                <button
                  onClick={onClose}
                  className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  I Understand, Continue
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default LegalModal;
