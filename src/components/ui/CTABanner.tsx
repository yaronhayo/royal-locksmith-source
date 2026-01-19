import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CTABannerProps {
  title: string;
  description?: string;
  primaryAction: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  variant?: 'primary' | 'dark' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    dark: 'bg-secondary-800 text-secondary-50',
    gradient: 'bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 text-white',
  };

  const sizeClasses = {
    sm: {
      padding: 'py-10 px-6',
      title: 'text-2xl sm:text-3xl',
      description: 'text-base',
      buttons: 'gap-3',
    },
    md: {
      padding: 'py-16 px-8',
      title: 'text-3xl sm:text-4xl lg:text-5xl',
      description: 'text-lg',
      buttons: 'gap-4',
    },
    lg: {
      padding: 'py-24 px-10',
      title: 'text-4xl sm:text-5xl lg:text-6xl',
      description: 'text-xl',
      buttons: 'gap-5',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-3xl',
        variantClasses[variant],
        sizes.padding,
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn('font-display font-bold tracking-tight', sizes.title)}
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn('mx-auto mt-6 max-w-2xl opacity-90', sizes.description)}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            'mt-10 flex flex-col items-center justify-center sm:flex-row',
            sizes.buttons
          )}
        >
          {/* Primary button */}
          <a
            href={primaryAction.href}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl active:scale-[0.98]"
          >
            {primaryAction.icon}
            {primaryAction.label}
          </a>

          {/* Secondary button */}
          {secondaryAction && (
            <a
              href={secondaryAction.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {secondaryAction.icon}
              {secondaryAction.label}
            </a>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTABanner;
