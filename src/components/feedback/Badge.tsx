import React, { forwardRef, HTMLAttributes } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Dot only (no text) */
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: 'var(--ud-surface)',
    color: 'var(--ud-text-secondary)',
    border: '1px solid var(--ud-border)',
  },
  primary: {
    background: 'var(--ud-accent)',
    color: 'var(--ud-accent-text)',
    border: 'none',
  },
  success: {
    background: 'var(--ud-success-subtle)',
    color: 'var(--ud-success-text)',
    border: 'none',
  },
  warning: {
    background: 'var(--ud-warning-subtle)',
    color: 'var(--ud-warning-text)',
    border: 'none',
  },
  error: {
    background: 'var(--ud-error-subtle)',
    color: 'var(--ud-error-text)',
    border: 'none',
  },
  info: {
    background: 'rgba(50, 200, 202, 0.15)',
    color: 'var(--ud-accent)',
    border: 'none',
  },
};

const sizeStyles: Record<BadgeSize, { padding: string; fontSize: string }> = {
  sm: {
    padding: `${spacing[0.5]} ${spacing[1.5]}`,
    fontSize: textStyles.caption.fontSize,
  },
  md: {
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: textStyles.labelSmall.fontSize,
  },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'sm', dot = false, className, style, children, ...props }, ref) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    const combinedStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[1],
      padding: dot ? spacing[1] : sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontWeight: textStyles.label.fontWeight,
      lineHeight: 1,
      borderRadius: borderRadius.full,
      whiteSpace: 'nowrap',
      ...variantStyle,
      ...(dot && {
        width: size === 'sm' ? '8px' : '10px',
        height: size === 'sm' ? '8px' : '10px',
        padding: 0,
      }),
      ...style,
    };

    return (
      <span
        ref={ref}
        className={cn('ud-badge', `ud-badge--${variant}`, `ud-badge--${size}`, dot && 'ud-badge--dot', className)}
        style={combinedStyle}
        {...props}
      >
        {!dot && children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
