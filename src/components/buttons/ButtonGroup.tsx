import React, { forwardRef, HTMLAttributes, Children, cloneElement, isValidElement, ReactElement } from 'react';
import { borderRadius } from '../../tokens/shapes';
import { cn } from '../../utils/cn';
import { ButtonProps } from './Button';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical';
  /** Size to apply to all buttons */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Variant to apply to all buttons */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** Whether buttons should be attached (no gap) */
  attached?: boolean;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = 'horizontal',
      size,
      variant,
      attached = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === 'vertical';

    const combinedStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: isVertical ? 'column' : 'row',
      gap: attached ? 0 : '8px',
      ...style,
    };

    // Clone children with group props
    const childrenArray = Children.toArray(children);
    const clonedChildren = childrenArray.map((child, index) => {
      if (isValidElement(child)) {
        const isFirst = index === 0;
        const isLast = index === childrenArray.length - 1;

        let borderRadiusStyle: React.CSSProperties = {};

        if (attached && childrenArray.length > 1) {
          if (isVertical) {
            borderRadiusStyle = {
              borderRadius: isFirst
                ? `${borderRadius.sm} ${borderRadius.sm} 0 0`
                : isLast
                  ? `0 0 ${borderRadius.sm} ${borderRadius.sm}`
                  : '0',
              ...(isFirst ? {} : { borderTopWidth: '0' }),
            };
          } else {
            borderRadiusStyle = {
              borderRadius: isFirst
                ? `${borderRadius.sm} 0 0 ${borderRadius.sm}`
                : isLast
                  ? `0 ${borderRadius.sm} ${borderRadius.sm} 0`
                  : '0',
              ...(isFirst ? {} : { borderLeftWidth: '0' }),
            };
          }
        }

        return cloneElement(child as ReactElement<ButtonProps>, {
          size: size ?? (child.props as ButtonProps).size,
          variant: variant ?? (child.props as ButtonProps).variant,
          style: {
            ...(child.props as ButtonProps).style,
            ...borderRadiusStyle,
          },
        });
      }
      return child;
    });

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'ud-button-group',
          `ud-button-group--${orientation}`,
          attached && 'ud-button-group--attached',
          className
        )}
        style={combinedStyle}
        {...props}
      >
        {clonedChildren}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
