import React, { forwardRef, SVGAttributes } from 'react';
import { cn } from '../../utils/cn';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Icon size */
  size?: IconSize;
  /** Icon color - uses CSS variable or custom color */
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'success' | 'warning' | 'inherit' | string;
  /** SVG path or content (children) */
  children?: React.ReactNode;
  /** Name for accessibility */
  name?: string;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const colorMap: Record<string, string> = {
  primary: 'var(--ud-text)',
  secondary: 'var(--ud-text-secondary)',
  muted: 'var(--ud-text-muted)',
  accent: 'var(--ud-accent)',
  error: 'var(--ud-error-text)',
  success: 'var(--ud-success-text)',
  warning: 'var(--ud-warning-text)',
  inherit: 'currentColor',
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', color = 'inherit', name, className, style, children, ...props }, ref) => {
    const dimension = sizeMap[size];
    const resolvedColor = colorMap[color] || color;

    return (
      <svg
        ref={ref}
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        fill="none"
        stroke={resolvedColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label={name}
        role={name ? 'img' : 'presentation'}
        className={cn('ud-icon', `ud-icon--${size}`, className)}
        style={style}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

// Common icon components using Lucide-style paths
export const Icons = {
  Check: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  ),

  X: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  ),

  ChevronDown: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  ),

  ChevronRight: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  ),

  ChevronLeft: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  ),

  Search: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Icon>
  ),

  Menu: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Icon>
  ),

  Plus: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  ),

  Minus: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  ),

  Settings: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Icon>
  ),

  AlertCircle: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </Icon>
  ),

  CheckCircle: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
  ),

  Info: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </Icon>
  ),

  Loader: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </Icon>
  ),

  Sun: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </Icon>
  ),

  Moon: (props: Omit<IconProps, 'children'>) => (
    <Icon {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Icon>
  ),
};
