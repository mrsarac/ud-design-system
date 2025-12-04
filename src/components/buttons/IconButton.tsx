import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { borderRadius, transitions } from '../../tokens/shapes';
import { cn } from '../../utils/cn';

export type IconButtonVariant = 'default' | 'ghost' | 'outline';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display */
  icon: ReactNode;
  /** Button style variant */
  variant?: IconButtonVariant;
  /** Button size */
  size?: IconButtonSize;
  /** Loading state */
  loading?: boolean;
  /** Accessibility label (required) */
  'aria-label': string;
}

const variantStyles: Record<IconButtonVariant, React.CSSProperties> = {
  default: {
    background: 'var(--ud-surface)',
    color: 'var(--ud-text)',
    border: '1px solid var(--ud-border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ud-text-secondary)',
    border: '1px solid transparent',
  },
  outline: {
    background: 'transparent',
    color: 'var(--ud-accent)',
    border: '1px solid var(--ud-accent)',
  },
};

const sizeConfig: Record<IconButtonSize, { dimension: string; iconSize: number }> = {
  xs: { dimension: '24px', iconSize: 14 },
  sm: { dimension: '32px', iconSize: 16 },
  md: { dimension: '40px', iconSize: 20 },
  lg: { dimension: '48px', iconSize: 24 },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'default',
      size = 'md',
      loading = false,
      disabled,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeConfig[size];
    const isDisabled = disabled || loading;

    const combinedStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeStyle.dimension,
      height: sizeStyle.dimension,
      padding: 0,
      borderRadius: borderRadius.sm,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: transitions.colors,
      outline: 'none',
      ...variantStyle,
      opacity: isDisabled ? 0.5 : 1,
      ...style,
    };

    // Clone icon with correct size
    const renderIcon = () => {
      if (loading) {
        return <LoadingSpinner size={sizeStyle.iconSize} />;
      }
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
          size: sizeStyle.iconSize,
        });
      }
      return icon;
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'ud-icon-button',
          `ud-icon-button--${variant}`,
          `ud-icon-button--${size}`,
          loading && 'ud-icon-button--loading',
          className
        )}
        style={combinedStyle}
        {...props}
      >
        {renderIcon()}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

function LoadingSpinner({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animation: 'ud-spin 1s linear infinite' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
