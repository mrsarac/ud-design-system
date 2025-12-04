import React, { forwardRef, HTMLAttributes } from 'react';
import { borderRadius, shadows } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Surface elevation level */
  elevation?: 'base' | 'raised' | 'overlay';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Border radius size */
  radius?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether to show border */
  bordered?: boolean;
  /** Whether surface is interactive (hover effects) */
  interactive?: boolean;
  /** Whether surface is currently active/selected */
  active?: boolean;
}

const elevationStyles = {
  base: {
    background: 'var(--ud-surface)',
    boxShadow: shadows.none,
  },
  raised: {
    background: 'var(--ud-surface)',
    boxShadow: shadows.sm,
  },
  overlay: {
    background: 'var(--ud-surface)',
    boxShadow: shadows.lg,
  },
};

const paddingMap = {
  none: '0',
  sm: spacing[3],
  md: spacing[4],
  lg: spacing[6],
};

const radiusMap = {
  none: borderRadius.none,
  sm: borderRadius.sm,
  md: borderRadius.md,
  lg: borderRadius.lg,
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      elevation = 'base',
      padding = 'md',
      radius = 'md',
      bordered = false,
      interactive = false,
      active = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const elevationStyle = elevationStyles[elevation];

    const combinedStyle: React.CSSProperties = {
      ...elevationStyle,
      padding: paddingMap[padding],
      borderRadius: radiusMap[radius],
      border: bordered ? '1px solid var(--ud-border)' : 'none',
      transition: interactive ? 'background-color 150ms ease, border-color 150ms ease' : undefined,
      cursor: interactive ? 'pointer' : undefined,
      ...(active && {
        background: 'var(--ud-surface-active)',
        borderColor: 'var(--ud-accent)',
      }),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'ud-surface',
          `ud-surface--${elevation}`,
          interactive && 'ud-surface--interactive',
          active && 'ud-surface--active',
          className
        )}
        style={combinedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
