import React, { forwardRef, HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, shadows, transitions, zIndex } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';
import { Icons } from '../primitives/Icon';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether dialog is open */
  open: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Dialog size */
  size?: DialogSize;
  /** Show close button */
  closable?: boolean;
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Footer content (buttons) */
  footer?: ReactNode;
}

const sizeStyles: Record<DialogSize, { width: string; maxWidth: string }> = {
  sm: { width: '100%', maxWidth: '400px' },
  md: { width: '100%', maxWidth: '500px' },
  lg: { width: '100%', maxWidth: '640px' },
  xl: { width: '100%', maxWidth: '800px' },
  full: { width: '100%', maxWidth: '100%' },
};

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = 'md',
      closable = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      footer,
      className,
      style,
      children,
      ...props
    },
    _ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Focus trap and body scroll lock
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
        dialogRef.current?.focus();
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    if (!open) return null;

    const sizeStyle = sizeStyles[size];

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      zIndex: zIndex.modal,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing[4],
      background: 'var(--ud-overlay)',
      animation: 'ud-fade-in 150ms ease-out',
    };

    const dialogStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      ...sizeStyle,
      maxHeight: 'calc(100vh - 64px)',
      background: 'var(--ud-surface)',
      border: '1px solid var(--ud-border)',
      borderRadius: borderRadius.lg,
      boxShadow: shadows.xl,
      animation: 'ud-scale-in 150ms ease-out',
      outline: 'none',
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: spacing[6],
      paddingBottom: title || description ? spacing[4] : 0,
    };

    const titleStyle: React.CSSProperties = {
      ...textStyles.h4,
      color: 'var(--ud-text)',
      margin: 0,
    };

    const descriptionStyle: React.CSSProperties = {
      ...textStyles.bodySmall,
      color: 'var(--ud-text-secondary)',
      marginTop: spacing[1],
    };

    const closeButtonStyle: React.CSSProperties = {
      flexShrink: 0,
      padding: spacing[2],
      background: 'transparent',
      border: 'none',
      borderRadius: borderRadius.sm,
      cursor: 'pointer',
      color: 'var(--ud-text-muted)',
      transition: transitions.colors,
      marginLeft: 'auto',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      padding: `0 ${spacing[6]}`,
      paddingBottom: spacing[6],
      overflow: 'auto',
    };

    const footerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: spacing[3],
      padding: spacing[6],
      paddingTop: spacing[4],
      borderTop: '1px solid var(--ud-border)',
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div style={overlayStyle} onClick={handleBackdropClick}>
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'dialog-title' : undefined}
          aria-describedby={description ? 'dialog-description' : undefined}
          tabIndex={-1}
          className={cn('ud-dialog', `ud-dialog--${size}`, className)}
          style={dialogStyle}
          {...props}
        >
          {(title || description || closable) && (
            <div style={headerStyle}>
              <div>
                {title && (
                  <h2 id="dialog-title" style={titleStyle}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="dialog-description" style={descriptionStyle}>
                    {description}
                  </p>
                )}
              </div>
              {closable && (
                <button type="button" onClick={onClose} style={closeButtonStyle} aria-label="Close dialog">
                  <Icons.X size="md" />
                </button>
              )}
            </div>
          )}

          <div style={contentStyle}>{children}</div>

          {footer && <div style={footerStyle}>{footer}</div>}
        </div>
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';
