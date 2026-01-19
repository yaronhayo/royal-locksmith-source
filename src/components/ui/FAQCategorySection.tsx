/**
 * FAQ Category Section Component
 * 
 * Displays FAQ questions with progressive reveal "See More" functionality.
 * Shows 8 questions initially, adds 8 more per click (max 48 per category).
 */
import React, { useState } from 'react';
import { Accordion, type AccordionItem } from './Accordion';
import { ChevronDown, HelpCircle, Home, Building2, Car, AlertTriangle, MapPin, Wrench } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FAQItem {
  question: string;
  answer: string;
}

// Map icon names to Lucide components
const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  'lucide:help-circle': HelpCircle,
  'lucide:home': Home,
  'lucide:building-2': Building2,
  'lucide:car': Car,
  'lucide:alert-triangle': AlertTriangle,
  'lucide:map-pin': MapPin,
  'lucide:wrench': Wrench,
};

export interface FAQCategorySectionProps {
  categoryIndex: number;
  title: string;
  iconName: string;
  faqs: FAQItem[];
  itemsPerPage?: number;
  background?: 'default' | 'muted';
}

export const FAQCategorySection: React.FC<FAQCategorySectionProps> = ({
  categoryIndex,
  title,
  iconName,
  faqs,
  itemsPerPage = 8,
  background = 'default',
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  
  // Get the icon component from the name
  const IconComponent = iconComponents[iconName] || HelpCircle;
  
  const visibleFaqs = faqs.slice(0, visibleCount);
  const hasMore = visibleCount < faqs.length;
  const remainingCount = Math.min(itemsPerPage, faqs.length - visibleCount);
  
  // Convert to Accordion items format
  const accordionItems: AccordionItem[] = visibleFaqs.map((faq, faqIndex) => ({
    id: `cat-${categoryIndex}-faq-${faqIndex}`,
    title: faq.question,
    content: faq.answer,
  }));
  
  const handleSeeMore = () => {
    setVisibleCount(prev => Math.min(prev + itemsPerPage, faqs.length));
  };

  return (
    <section
      id={`category-${categoryIndex}`}
      className={cn(
        'py-16 lg:py-20',
        background === 'muted' ? 'bg-muted/50' : 'bg-background'
      )}
    >
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          {/* Category Header */}
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconComponent className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion 
            items={accordionItems} 
            defaultOpen={accordionItems.length > 0 ? [accordionItems[0].id] : []} 
          />

          {/* See More Button */}
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSeeMore}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-xl px-8 py-4',
                  'border-2 border-primary bg-primary/5 text-primary',
                  'font-semibold transition-all duration-300',
                  'hover:bg-primary hover:text-primary-foreground hover:shadow-glow',
                  'active:scale-95'
                )}
              >
                <span>See More Questions</span>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-sm group-hover:bg-white/20">
                  +{remainingCount}
                </span>
                <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          )}
          
          {/* Progress indicator */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing {visibleFaqs.length} of {faqs.length} questions
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQCategorySection;
