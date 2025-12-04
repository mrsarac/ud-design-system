import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon to display before label */
  leftIcon?: ReactNode;
  /** Icon to display after label */
  rightIcon?: ReactNode;
  /** Icon-only button (requires aria-label) */
  iconOnly?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--ud-accent)',
    color: 'var(--ud-accent-text)',
    border: 'none',
  },
  secondary: {
    background: 'var(--ud-surface)',
    color: 'var(--ud-text)',
    border: '1px solid var(--ud-border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ud-text)',
    border: '1px solid transparent',
  },
  destructive: {
    background: 'var(--ud-error)',
    color: 'var(--ud-white, #FFFFFF)',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: 'var(--ud-accent)',
    border: '1px solid var(--ud-accent)',
  },
};

const sizeStyles: Record<ButtonSize, { padding: string; fontSize: string; height: string; iconSize: number }> = {
  xs: {
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: textStyles.buttonSmall.fontSize,
    height: '28px',
    iconSize: 14,
  },
  sm: {
    padding: `${spacing[1.5]} ${spacing[3]}`,
    fontSize: textStyles.buttonSmall.fontSize,
    height: '32px',
    iconSize: 16,
  },
  md: {
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: textStyles.button.fontSize,
    height: '40px',
    iconSize: 18,
  },
  lg: {
    padding: `${spacing[3]} ${spacing[6]}`,
    fontSize: textStyles.button.fontSize,
    height: '48px',
    iconSize: 20,
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];
    const isDisabled = disabled || loading;

    const combinedStyle: React.CSSProperties = {
      // Base styles
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[2],
      fontFamily: textStyles.button.fontFamily,
      fontWeight: textStyles.button.fontWeight,
      letterSpacing: textStyles.button.letterSpacing,
      borderRadius: borderRadius.sm,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: transitions.colors,
      outline: 'none',
      textDecoration: 'none',
      userSelect: 'none',

      // Variant styles
      ...variantStyle,

      // Size styles
      padding: iconOnly ? spacing[2] : sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      height: sizeStyle.height,
      minWidth: iconOnly ? sizeStyle.height : undefined,

      // Full width
      width: fullWidth ? '100%' : undefined,

      // Disabled state
      opacity: isDisabled ? 0.5 : 1,

      ...style,
    };

    // Render icon with correct size
    const renderIcon = (icon: ReactNode) => {
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
          'ud-button',
          `ud-button--${variant}`,
          `ud-button--${size}`,
          fullWidth && 'ud-button--full-width',
          loading && 'ud-button--loading',
          iconOnly && 'ud-button--icon-only',
          className
        )}
        style={combinedStyle}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size={sizeStyle.iconSize} />
        ) : (
          <>
            {leftIcon && renderIcon(leftIcon)}
            {!iconOnly && children}
            {rightIcon && renderIcon(rightIcon)}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Loading spinner component
function LoadingSpinner({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        animation: 'ud-spin 1s linear infinite',
      }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
