import React, { forwardRef, HTMLAttributes } from 'react';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether to use subtle border color */
  subtle?: boolean;
}

const spacingMap = {
  none: '0',
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      spacing: spacingProp = 'md',
      subtle = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';
    const spacingValue = spacingMap[spacingProp];

    const combinedStyle: React.CSSProperties = {
      border: 'none',
      backgroundColor: subtle ? 'var(--ud-border-subtle)' : 'var(--ud-border)',
      ...(isHorizontal
        ? {
            height: '1px',
            width: '100%',
            marginTop: spacingValue,
            marginBottom: spacingValue,
          }
        : {
            width: '1px',
            height: '100%',
            marginLeft: spacingValue,
            marginRight: spacingValue,
          }),
      ...style,
    };

    return (
      <hr
        ref={ref}
        className={cn(
          'ud-divider',
          `ud-divider--${orientation}`,
          subtle && 'ud-divider--subtle',
          className
        )}
        style={combinedStyle}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
