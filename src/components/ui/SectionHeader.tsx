import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'primary' | 'secondary';
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'secondary',
  title,
  titleHighlight,
  description,
  align = 'center',
  size = 'md',
  className,
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const sizeClasses = {
    sm: {
      container: 'max-w-xl',
      title: 'text-2xl sm:text-3xl',
      description: 'text-base mt-3',
    },
    md: {
      container: 'max-w-3xl',
      title: 'text-3xl sm:text-4xl',
      description: 'text-lg mt-4',
    },
    lg: {
      container: 'max-w-4xl',
      title: 'text-4xl sm:text-5xl',
      description: 'text-xl mt-6',
    },
  };

  const sizes = sizeClasses[size];

  const badgeClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn(alignClasses[align], sizes.container, className)}
    >
      {badge && (
        <span className={cn(
          'mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
          badgeClasses[badgeVariant]
        )}>
          {badge}
        </span>
      )}
      
      <h2 className={cn(
        'font-display font-bold tracking-tight',
        sizes.title
      )}>
        {titleHighlight ? (
          <>
            {title.split(titleHighlight)[0]}
            <span className="text-primary">{titleHighlight}</span>
            {title.split(titleHighlight)[1]}
          </>
        ) : (
          title
        )}
      </h2>
      
      {description && (
        <p className={cn(
          'text-muted-foreground',
          sizes.description
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
