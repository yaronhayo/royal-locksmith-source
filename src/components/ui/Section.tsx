import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface SectionProps {
  container?: boolean | 'narrow' | 'wide';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'primary' | 'dark' | 'gradient' | 'subtle' | 'warm' | 'cool';
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
  pattern?: boolean;
}

const sizes = {
  sm: 'py-8 md:py-12 lg:py-16',
  md: 'py-12 md:py-16 lg:py-20',
  lg: 'py-16 md:py-24 lg:py-32',
  xl: 'py-20 md:py-28 lg:py-36',
};

const backgrounds = {
  default: 'bg-background',
  muted: 'bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30',
  primary: 'bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground',
  dark: 'bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950 text-secondary-50',
  gradient: 'bg-gradient-to-br from-primary-50 via-background to-accent-50 dark:from-primary-950 dark:via-background dark:to-accent-950',
  subtle: 'bg-gradient-to-b from-background via-muted/20 to-background',
  warm: 'bg-gradient-to-br from-primary-50/50 via-background to-primary-50/30 dark:from-primary-950/30 dark:via-background dark:to-primary-950/20',
  cool: 'bg-gradient-to-br from-secondary-50 via-background to-accent-50/30 dark:from-secondary-900 dark:via-background dark:to-accent-950/30',
};

const containers = {
  true: 'container-custom',
  narrow: 'container-narrow',
  wide: 'container-wide',
};

// Subtle dot pattern for visual interest
const PatternOverlay: React.FC = () => (
  <div 
    className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
    style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
      backgroundSize: '24px 24px',
    }}
  />
);

export const Section: React.FC<SectionProps> = ({
  className,
  container = true,
  size = 'md',
  background = 'default',
  animate = true,
  children,
  id,
  pattern = false,
}) => {
  const content = container ? (
    <div className={containers[container === true ? 'true' : container]}>
      {children}
    </div>
  ) : (
    children
  );

  const sectionContent = (
    <>
      {pattern && <PatternOverlay />}
      {content}
    </>
  );

  if (animate) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className={cn('relative', sizes[size], backgrounds[background], className)}
      >
        {sectionContent}
      </motion.section>
    );
  }

  return (
    <section
      id={id}
      className={cn('relative', sizes[size], backgrounds[background], className)}
    >
      {sectionContent}
    </section>
  );
};

export default Section;
