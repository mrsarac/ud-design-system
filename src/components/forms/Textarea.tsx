import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export type TextareaState = 'default' | 'error' | 'success';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Validation state */
  state?: TextareaState;
  /** Label text */
  label?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Error message (shown when state is error) */
  errorMessage?: string;
  /** Full width textarea */
  fullWidth?: boolean;
  /** Whether to allow manual resize */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const stateStyles: Record<TextareaState, React.CSSProperties> = {
  default: { borderColor: 'var(--ud-border)' },
  error: { borderColor: 'var(--ud-error)' },
  success: { borderColor: 'var(--ud-success)' },
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      state = 'default',
      label,
      helperText,
      errorMessage,
      fullWidth = false,
      resize = 'vertical',
      disabled,
      className,
      style,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const stateStyle = stateStyles[state];
    const showError = state === 'error' && errorMessage;

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
      width: fullWidth ? '100%' : 'auto',
    };

    const textareaStyle: React.CSSProperties = {
      width: '100%',
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: textStyles.body.fontSize,
      fontFamily: textStyles.body.fontFamily,
      lineHeight: textStyles.body.lineHeight,
      color: 'var(--ud-text)',
      background: 'var(--ud-surface)',
      border: '1px solid',
      borderRadius: borderRadius.sm,
      outline: 'none',
      transition: transitions.colors,
      resize,
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

    return (
      <div className={cn('ud-textarea-wrapper', fullWidth && 'ud-textarea-wrapper--full-width')} style={wrapperStyle}>
        {label && (
          <label htmlFor={textareaId} style={labelStyle}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={rows}
          className={cn('ud-textarea', `ud-textarea--${state}`, className)}
          style={textareaStyle}
          {...props}
        />
        {(helperText || showError) && (
          <span style={helperStyle}>{showError ? errorMessage : helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
