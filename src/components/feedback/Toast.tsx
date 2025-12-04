import React, { forwardRef, HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, shadows, transitions, zIndex } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';
import { Icons } from '../primitives/Icon';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Toast variant */
  variant?: ToastVariant;
  /** Toast title */
  title?: string;
  /** Toast description */
  description?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Show close button */
  closable?: boolean;
  /** Duration in ms (0 for persistent) */
  duration?: number;
  /** Callback when toast is closed */
  onClose?: () => void;
  /** Whether toast is visible */
  open?: boolean;
}

const variantStyles: Record<ToastVariant, { background: string; border: string; iconColor: string }> = {
  default: {
    background: 'var(--ud-surface)',
    border: 'var(--ud-border)',
    iconColor: 'var(--ud-text-secondary)',
  },
  success: {
    background: 'var(--ud-surface)',
    border: 'var(--ud-success)',
    iconColor: 'var(--ud-success)',
  },
  warning: {
    background: 'var(--ud-surface)',
    border: 'var(--ud-warning)',
    iconColor: 'var(--ud-warning)',
  },
  error: {
    background: 'var(--ud-surface)',
    border: 'var(--ud-error)',
    iconColor: 'var(--ud-error)',
  },
  info: {
    background: 'var(--ud-surface)',
    border: 'var(--ud-accent)',
    iconColor: 'var(--ud-accent)',
  },
};

const defaultIcons: Record<ToastVariant, ReactNode> = {
  default: <Icons.Info size="md" />,
  success: <Icons.CheckCircle size="md" />,
  warning: <Icons.AlertCircle size="md" />,
  error: <Icons.AlertCircle size="md" />,
  info: <Icons.Info size="md" />,
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'default',
      title,
      description,
      icon,
      closable = true,
      duration = 5000,
      onClose,
      open = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(open);
    const variantStyle = variantStyles[variant];

    useEffect(() => {
      setIsVisible(open);
    }, [open]);

    useEffect(() => {
      if (duration > 0 && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, isVisible, onClose]);

    if (!isVisible) return null;

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    const toastStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: spacing[3],
      padding: spacing[4],
      background: variantStyle.background,
      border: `1px solid ${variantStyle.border}`,
      borderRadius: borderRadius.md,
      boxShadow: shadows.lg,
      maxWidth: '400px',
      minWidth: '300px',
      animation: 'ud-slide-in 200ms ease-out',
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      color: variantStyle.iconColor,
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
    };

    const titleStyle: React.CSSProperties = {
      ...textStyles.label,
      color: 'var(--ud-text)',
    };

    const descriptionStyle: React.CSSProperties = {
      ...textStyles.bodySmall,
      color: 'var(--ud-text-secondary)',
    };

    const closeButtonStyle: React.CSSProperties = {
      flexShrink: 0,
      padding: spacing[1],
      background: 'transparent',
      border: 'none',
      borderRadius: borderRadius.sm,
      cursor: 'pointer',
      color: 'var(--ud-text-muted)',
      transition: transitions.colors,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn('ud-toast', `ud-toast--${variant}`, className)}
        style={toastStyle}
        {...props}
      >
        <span style={iconStyle}>{icon || defaultIcons[variant]}</span>
        <div style={contentStyle}>
          {title && <span style={titleStyle}>{title}</span>}
          {description && <span style={descriptionStyle}>{description}</span>}
        </div>
        {closable && (
          <button type="button" onClick={handleClose} style={closeButtonStyle} aria-label="Close">
            <Icons.X size="sm" />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast Container for positioning
export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  position?: ToastPosition;
}

const positionStyles: Record<ToastPosition, React.CSSProperties> = {
  'top-right': { top: spacing[4], right: spacing[4] },
  'top-left': { top: spacing[4], left: spacing[4] },
  'top-center': { top: spacing[4], left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: spacing[4], right: spacing[4] },
  'bottom-left': { bottom: spacing[4], left: spacing[4] },
  'bottom-center': { bottom: spacing[4], left: '50%', transform: 'translateX(-50%)' },
};

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ position = 'top-right', className, style, children, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      position: 'fixed',
      zIndex: zIndex.toast,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
      ...positionStyles[position],
      ...style,
    };

    return (
      <div ref={ref} className={cn('ud-toast-container', className)} style={containerStyle} {...props}>
        {children}
      </div>
    );
  }
);

ToastContainer.displayName = 'ToastContainer';
