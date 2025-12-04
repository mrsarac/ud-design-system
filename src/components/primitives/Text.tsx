import React, { forwardRef, HTMLAttributes } from 'react';
import { textStyles, TextStyle } from '../../tokens/typography';
import { cn } from '../../utils/cn';

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div' | 'code';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** The text style variant to use */
  variant?: TextStyle;
  /** The HTML element to render */
  as?: TextElement;
  /** Text color - uses CSS variable or custom color */
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'success' | 'warning' | string;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Number of lines before truncating (requires truncate) */
  lines?: number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether to use monospace font */
  mono?: boolean;
}

const colorMap: Record<string, string> = {
  primary: 'var(--ud-text)',
  secondary: 'var(--ud-text-secondary)',
  muted: 'var(--ud-text-muted)',
  accent: 'var(--ud-accent)',
  error: 'var(--ud-error-text)',
  success: 'var(--ud-success-text)',
  warning: 'var(--ud-warning-text)',
};

const defaultElementMap: Record<TextStyle, TextElement> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  bodyLarge: 'p',
  body: 'p',
  bodySmall: 'p',
  label: 'label',
  labelSmall: 'label',
  caption: 'span',
  code: 'code',
  codeSmall: 'code',
  button: 'span',
  buttonSmall: 'span',
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      as,
      color = 'primary',
      truncate = false,
      lines,
      align,
      mono = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Element = as || defaultElementMap[variant] || 'span';
    const textStyle = textStyles[variant];

    const resolvedColor = colorMap[color] || color;

    const combinedStyle: React.CSSProperties = {
      fontFamily: mono ? 'var(--ud-font-mono)' : textStyle.fontFamily,
      fontSize: textStyle.fontSize,
      fontWeight: textStyle.fontWeight,
      lineHeight: textStyle.lineHeight,
      letterSpacing: textStyle.letterSpacing,
      color: resolvedColor,
      textAlign: align,
      ...(truncate && !lines && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
      ...(truncate && lines && {
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }),
      ...style,
    };

    return React.createElement(
      Element,
      {
        ref,
        className: cn('ud-text', `ud-text--${variant}`, className),
        style: combinedStyle,
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';
