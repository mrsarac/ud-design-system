import React, { forwardRef, HTMLAttributes } from 'react';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

type SpacingKey = keyof typeof spacing;

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack */
  direction?: 'vertical' | 'horizontal';
  /** Gap between items */
  gap?: SpacingKey;
  /** Alignment along the cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Alignment along the main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Whether items should wrap */
  wrap?: boolean;
  /** Whether to use inline-flex instead of flex */
  inline?: boolean;
}

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 4,
      align = 'stretch',
      justify = 'start',
      wrap = false,
      inline = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const combinedStyle: React.CSSProperties = {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap: spacing[gap],
      alignItems: alignMap[align],
      justifyContent: justifyMap[justify],
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn('ud-stack', `ud-stack--${direction}`, className)}
        style={combinedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

// Convenience components
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="vertical" {...props} />
);
VStack.displayName = 'VStack';

export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="horizontal" {...props} />
);
HStack.displayName = 'HStack';
