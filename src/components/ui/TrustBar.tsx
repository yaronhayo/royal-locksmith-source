import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TrustBarProps {
  stats: StatItem[];
  variant?: 'default' | 'compact' | 'large';
  className?: string;
}

export const TrustBar: React.FC<TrustBarProps> = ({
  stats,
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const sizes = {
    compact: {
      value: 'text-2xl lg:text-3xl',
      label: 'text-xs',
      gap: 'gap-6 lg:gap-10',
    },
    default: {
      value: 'text-3xl lg:text-4xl',
      label: 'text-sm',
      gap: 'gap-8 lg:gap-16',
    },
    large: {
      value: 'text-4xl lg:text-5xl',
      label: 'text-base',
      gap: 'gap-12 lg:gap-20',
    },
  };

  const size = sizes[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className={cn(
        'flex flex-wrap items-center justify-center',
        size.gap,
        className
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="text-center"
        >
          <div className={cn(
            'flex items-center justify-center gap-1 font-bold text-primary',
            size.value
          )}>
            {stat.icon}
            <span className="tabular-nums">{stat.value}</span>
          </div>
          <div className={cn('mt-1 text-muted-foreground', size.label)}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Counter animation component for numbers
export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}) => {
  // Start with target value to prevent hydration mismatch
  const [count, setCount] = React.useState(value);

  React.useEffect(() => {
    // Reset to 0 and animate on client
    setCount(0);
    
    const step = Math.ceil(value / (duration / 16));
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, []); // Only run once on mount

  return (
    <span className={cn('tabular-nums', className)} suppressHydrationWarning>
      {prefix}{count.toLocaleString('en-US')}{suffix}
    </span>
  );
};

export default TrustBar;
