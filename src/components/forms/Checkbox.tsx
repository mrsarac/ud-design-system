import React, { forwardRef, InputHTMLAttributes } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Checkbox size */
  size?: CheckboxSize;
  /** Label text */
  label?: string;
  /** Helper text below checkbox */
  helperText?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
}

const sizeStyles: Record<CheckboxSize, { box: string; icon: number }> = {
  sm: { box: '16px', icon: 12 },
  md: { box: '20px', icon: 14 },
  lg: { box: '24px', icon: 18 },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      label,
      helperText,
      indeterminate = false,
      disabled,
      checked,
      className,
      style,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const sizeStyle = sizeStyles[size];

    // Handle indeterminate state via ref
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!, []);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const wrapperStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: spacing[2],
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    const checkboxWrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: sizeStyle.box,
      height: sizeStyle.box,
      flexShrink: 0,
    };

    const inputStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      margin: 0,
      opacity: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const boxStyle: React.CSSProperties = {
      width: sizeStyle.box,
      height: sizeStyle.box,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked || indeterminate ? 'var(--ud-accent)' : 'var(--ud-surface)',
      border: `1px solid ${checked || indeterminate ? 'var(--ud-accent)' : 'var(--ud-border)'}`,
      borderRadius: borderRadius.xs,
      transition: transitions.colors,
    };

    const labelContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[0.5],
    };

    const labelStyle: React.CSSProperties = {
      ...textStyles.body,
      color: 'var(--ud-text)',
      lineHeight: sizeStyle.box,
    };

    const helperStyle: React.CSSProperties = {
      ...textStyles.caption,
      color: 'var(--ud-text-muted)',
    };

    return (
      <label style={wrapperStyle} className={cn('ud-checkbox', `ud-checkbox--${size}`, className)}>
        <span style={checkboxWrapperStyle}>
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            style={inputStyle}
            {...props}
          />
          <span style={boxStyle}>
            {(checked || indeterminate) && (
              <svg
                width={sizeStyle.icon}
                height={sizeStyle.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ud-accent-text)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {indeterminate ? (
                  <line x1="5" y1="12" x2="19" y2="12" />
                ) : (
                  <polyline points="20 6 9 17 4 12" />
                )}
              </svg>
            )}
          </span>
        </span>
        {(label || helperText) && (
          <span style={labelContainerStyle}>
            {label && <span style={labelStyle}>{label}</span>}
            {helperText && <span style={helperStyle}>{helperText}</span>}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
