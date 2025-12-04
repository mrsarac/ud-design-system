import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectState = 'default' | 'error' | 'success';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select size */
  size?: SelectSize;
  /** Validation state */
  state?: SelectState;
  /** Label text */
  label?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error message (shown when state is error) */
  errorMessage?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Options to display */
  options?: SelectOption[];
  /** Full width select */
  fullWidth?: boolean;
}

const sizeStyles: Record<SelectSize, { padding: string; fontSize: string; height: string }> = {
  sm: {
    padding: `${spacing[1.5]} ${spacing[8]} ${spacing[1.5]} ${spacing[2]}`,
    fontSize: textStyles.bodySmall.fontSize,
    height: '32px',
  },
  md: {
    padding: `${spacing[2]} ${spacing[10]} ${spacing[2]} ${spacing[3]}`,
    fontSize: textStyles.body.fontSize,
    height: '40px',
  },
  lg: {
    padding: `${spacing[3]} ${spacing[12]} ${spacing[3]} ${spacing[4]}`,
    fontSize: textStyles.body.fontSize,
    height: '48px',
  },
};

const stateStyles: Record<SelectState, React.CSSProperties> = {
  default: { borderColor: 'var(--ud-border)' },
  error: { borderColor: 'var(--ud-error)' },
  success: { borderColor: 'var(--ud-success)' },
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      placeholder,
      options = [],
      fullWidth = false,
      disabled,
      className,
      style,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const sizeStyle = sizeStyles[size];
    const stateStyle = stateStyles[state];
    const showError = state === 'error' && errorMessage;

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
      width: fullWidth ? '100%' : 'auto',
    };

    const selectWrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      width: fullWidth ? '100%' : 'auto',
    };

    const selectStyle: React.CSSProperties = {
      width: '100%',
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontFamily: textStyles.body.fontFamily,
      lineHeight: textStyles.body.lineHeight,
      color: 'var(--ud-text)',
      background: 'var(--ud-surface)',
      border: '1px solid',
      borderRadius: borderRadius.sm,
      outline: 'none',
      appearance: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: transitions.colors,
      ...stateStyle,
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    const chevronStyle: React.CSSProperties = {
      position: 'absolute',
      right: spacing[3],
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--ud-text-muted)',
    };

    const labelStyle: React.CSSProperties = {
      ...textStyles.label,
      color: 'var(--ud-text)',
    };

    const helperStyle: React.CSSProperties = {
      ...textStyles.caption,
      color: showError ? 'var(--ud-error-text)' : 'var(--ud-text-muted)',
    };

    return (
      <div className={cn('ud-select-wrapper', fullWidth && 'ud-select-wrapper--full-width')} style={wrapperStyle}>
        {label && (
          <label htmlFor={selectId} style={labelStyle}>
            {label}
          </label>
        )}
        <div style={selectWrapperStyle}>
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn('ud-select', `ud-select--${size}`, `ud-select--${state}`, className)}
            style={selectStyle}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
          <span style={chevronStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        {(helperText || showError) && (
          <span style={helperStyle}>{showError ? errorMessage : helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
