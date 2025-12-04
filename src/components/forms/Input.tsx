import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size */
  size?: InputSize;
  /** Validation state */
  state?: InputState;
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (shown when state is error) */
  errorMessage?: string;
  /** Icon or element to display at the start */
  leftElement?: ReactNode;
  /** Icon or element to display at the end */
  rightElement?: ReactNode;
  /** Full width input */
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, { padding: string; fontSize: string; height: string }> = {
  sm: {
    padding: `${spacing[1.5]} ${spacing[2]}`,
    fontSize: textStyles.bodySmall.fontSize,
    height: '32px',
  },
  md: {
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: textStyles.body.fontSize,
    height: '40px',
  },
  lg: {
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: textStyles.body.fontSize,
    height: '48px',
  },
};

const stateStyles: Record<InputState, React.CSSProperties> = {
  default: {
    borderColor: 'var(--ud-border)',
  },
  error: {
    borderColor: 'var(--ud-error)',
  },
  success: {
    borderColor: 'var(--ud-success)',
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      leftElement,
      rightElement,
      fullWidth = false,
      disabled,
      className,
      style,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const sizeStyle = sizeStyles[size];
    const stateStyle = stateStyles[state];
    const showError = state === 'error' && errorMessage;

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
      width: fullWidth ? '100%' : 'auto',
    };

    const inputWrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const inputStyle: React.CSSProperties = {
      width: '100%',
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      paddingLeft: leftElement ? spacing[10] : sizeStyle.padding,
      paddingRight: rightElement ? spacing[10] : sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontFamily: textStyles.body.fontFamily,
      lineHeight: textStyles.body.lineHeight,
      color: 'var(--ud-text)',
      background: 'var(--ud-surface)',
      border: '1px solid',
      borderRadius: borderRadius.sm,
      outline: 'none',
      transition: transitions.colors,
      ...stateStyle,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      ...textStyles.label,
      color: 'var(--ud-text)',
    };

    const helperStyle: React.CSSProperties = {
      ...textStyles.caption,
      color: showError ? 'var(--ud-error-text)' : 'var(--ud-text-muted)',
    };

    const elementStyle: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: spacing[10],
      height: '100%',
      color: 'var(--ud-text-muted)',
      pointerEvents: 'none',
    };

    return (
      <div className={cn('ud-input-wrapper', fullWidth && 'ud-input-wrapper--full-width')} style={wrapperStyle}>
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
          </label>
        )}
        <div style={inputWrapperStyle}>
          {leftElement && (
            <span style={{ ...elementStyle, left: 0 }}>{leftElement}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'ud-input',
              `ud-input--${size}`,
              `ud-input--${state}`,
              className
            )}
            style={inputStyle}
            {...props}
          />
          {rightElement && (
            <span style={{ ...elementStyle, right: 0 }}>{rightElement}</span>
          )}
        </div>
        {(helperText || showError) && (
          <span style={helperStyle}>{showError ? errorMessage : helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
