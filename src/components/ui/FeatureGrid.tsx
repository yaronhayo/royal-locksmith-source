import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'compact' | 'centered';
  className?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 2,
  variant = 'default',
  className,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className={cn(
        'grid gap-6',
        gridCols[columns],
        className
      )}
    >
      {features.map((feature, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className={cn(
            'group flex gap-4',
            variant === 'centered' && 'flex-col items-center text-center'
          )}
        >
          {/* Icon container */}
          <div className={cn(
            'flex shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow',
            variant === 'compact' ? 'h-10 w-10' : 'h-12 w-12'
          )}>
            {feature.icon}
          </div>

          {/* Content */}
          <div className={variant === 'centered' ? 'mt-2' : ''}>
            <h3 className={cn(
              'font-semibold',
              variant === 'compact' ? 'text-base' : 'text-lg'
            )}>
              {feature.title}
            </h3>
            <p className={cn(
              'text-muted-foreground',
              variant === 'compact' ? 'text-xs mt-0.5' : 'text-sm mt-1'
            )}>
              {feature.description}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default FeatureGrid;
