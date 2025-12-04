import React, { forwardRef, InputHTMLAttributes } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Toggle size */
  size?: ToggleSize;
  /** Label text */
  label?: string;
  /** Helper text below toggle */
  helperText?: string;
  /** Position of the label */
  labelPosition?: 'left' | 'right';
}

const sizeStyles: Record<ToggleSize, { track: { width: string; height: string }; thumb: string; translate: string }> = {
  sm: {
    track: { width: '32px', height: '18px' },
    thumb: '14px',
    translate: '14px',
  },
  md: {
    track: { width: '44px', height: '24px' },
    thumb: '20px',
    translate: '20px',
  },
  lg: {
    track: { width: '56px', height: '30px' },
    thumb: '26px',
    translate: '26px',
  },
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = 'md',
      label,
      helperText,
      labelPosition = 'right',
      disabled,
      checked,
      className,
      style,
      id,
      ...props
    },
    ref
  ) => {
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    const sizeStyle = sizeStyles[size];

    const wrapperStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: spacing[3],
      flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    const toggleWrapperStyle: React.CSSProperties = {
      position: 'relative',
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

    const trackStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      width: sizeStyle.track.width,
      height: sizeStyle.track.height,
      padding: '2px',
      background: checked ? 'var(--ud-accent)' : 'var(--ud-surface)',
      border: `1px solid ${checked ? 'var(--ud-accent)' : 'var(--ud-border)'}`,
      borderRadius: borderRadius.full,
      transition: transitions.colors,
    };

    const thumbStyle: React.CSSProperties = {
      width: sizeStyle.thumb,
      height: sizeStyle.thumb,
      background: checked ? 'var(--ud-accent-text)' : 'var(--ud-text-muted)',
      borderRadius: borderRadius.full,
      transition: `transform ${transitions.fast}`,
      transform: checked ? `translateX(${sizeStyle.translate})` : 'translateX(0)',
    };

    const labelContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[0.5],
    };

    const labelStyle: React.CSSProperties = {
      ...textStyles.body,
      color: 'var(--ud-text)',
    };

    const helperStyle: React.CSSProperties = {
      ...textStyles.caption,
      color: 'var(--ud-text-muted)',
    };

    return (
      <label style={wrapperStyle} className={cn('ud-toggle', `ud-toggle--${size}`, className)}>
        <span style={toggleWrapperStyle}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={toggleId}
            checked={checked}
            disabled={disabled}
            style={inputStyle}
            {...props}
          />
          <span style={trackStyle}>
            <span style={thumbStyle} />
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

Toggle.displayName = 'Toggle';
