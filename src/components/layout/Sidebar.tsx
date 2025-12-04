import React, { forwardRef, HTMLAttributes, ReactNode, createContext, useContext, useState } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';
import { Icons } from '../primitives/Icon';

// Sidebar Context
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar provider');
  }
  return context;
}

// Sidebar Root
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Width when expanded */
  width?: string;
  /** Width when collapsed */
  collapsedWidth?: string;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      collapsed: controlledCollapsed,
      onCollapsedChange,
      defaultCollapsed = false,
      width = '260px',
      collapsedWidth = '64px',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const collapsed = controlledCollapsed ?? internalCollapsed;

    const setCollapsed = (newCollapsed: boolean) => {
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(newCollapsed);
      }
      onCollapsedChange?.(newCollapsed);
    };

    const sidebarStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: collapsed ? collapsedWidth : width,
      height: '100%',
      background: 'var(--ud-surface)',
      borderRight: '1px solid var(--ud-border)',
      transition: `width ${transitions.duration.normal}`,
      overflow: 'hidden',
      ...style,
    };

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed, activeItem, setActiveItem }}>
        <aside ref={ref} className={cn('ud-sidebar', collapsed && 'ud-sidebar--collapsed', className)} style={sidebarStyle} {...props}>
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = 'Sidebar';

// Sidebar Header
export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Logo or brand element */
  logo?: ReactNode;
  /** Title text (hidden when collapsed) */
  title?: string;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ logo, title, className, style, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[3],
      padding: spacing[4],
      borderBottom: '1px solid var(--ud-border)',
      ...style,
    };

    const titleStyle: React.CSSProperties = {
      ...textStyles.h5,
      color: 'var(--ud-text)',
      whiteSpace: 'nowrap',
      opacity: collapsed ? 0 : 1,
      transition: `opacity ${transitions.fast}`,
    };

    return (
      <div ref={ref} className={cn('ud-sidebar-header', className)} style={headerStyle} {...props}>
        {logo}
        {title && !collapsed && <span style={titleStyle}>{title}</span>}
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

// Sidebar Content (scrollable area)
export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, style, children, ...props }, ref) => {
    const contentStyle: React.CSSProperties = {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: spacing[2],
      ...style,
    };

    return (
      <div ref={ref} className={cn('ud-sidebar-content', className)} style={contentStyle} {...props}>
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = 'SidebarContent';

// Sidebar Section
export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, className, style, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    const sectionStyle: React.CSSProperties = {
      marginBottom: spacing[4],
      ...style,
    };

    const titleStyle: React.CSSProperties = {
      ...textStyles.labelSmall,
      color: 'var(--ud-text-muted)',
      padding: `${spacing[2]} ${spacing[3]}`,
      textTransform: 'uppercase',
      opacity: collapsed ? 0 : 1,
      height: collapsed ? 0 : 'auto',
      overflow: 'hidden',
      transition: `opacity ${transitions.fast}, height ${transitions.fast}`,
    };

    return (
      <div ref={ref} className={cn('ud-sidebar-section', className)} style={sectionStyle} {...props}>
        {title && <div style={titleStyle}>{title}</div>}
        {children}
      </div>
    );
  }
);

SidebarSection.displayName = 'SidebarSection';

// Sidebar Item
export interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Unique identifier */
  value: string;
  /** Icon element */
  icon?: ReactNode;
  /** Whether item is active */
  active?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Badge or indicator */
  badge?: ReactNode;
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ value, icon, active: controlledActive, disabled = false, badge, className, style, children, onClick, ...props }, ref) => {
    const { collapsed, activeItem, setActiveItem } = useSidebarContext();
    const isActive = controlledActive ?? activeItem === value;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setActiveItem(value);
        onClick?.(e);
      }
    };

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[3],
      width: '100%',
      padding: collapsed ? spacing[3] : `${spacing[2]} ${spacing[3]}`,
      justifyContent: collapsed ? 'center' : 'flex-start',
      background: isActive ? 'var(--ud-accent)' : 'transparent',
      color: isActive ? 'var(--ud-accent-text)' : 'var(--ud-text-secondary)',
      border: 'none',
      borderRadius: borderRadius.sm,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: transitions.colors,
      ...textStyles.body,
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      flex: 1,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      opacity: collapsed ? 0 : 1,
      width: collapsed ? 0 : 'auto',
      transition: `opacity ${transitions.fast}`,
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={cn('ud-sidebar-item', isActive && 'ud-sidebar-item--active', className)}
        style={itemStyle}
        {...props}
      >
        {icon}
        {!collapsed && <span style={labelStyle}>{children}</span>}
        {!collapsed && badge}
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

// Sidebar Footer
export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, style, children, ...props }, ref) => {
    const footerStyle: React.CSSProperties = {
      padding: spacing[4],
      borderTop: '1px solid var(--ud-border)',
      ...style,
    };

    return (
      <div ref={ref} className={cn('ud-sidebar-footer', className)} style={footerStyle} {...props}>
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = 'SidebarFooter';

// Sidebar Toggle Button
export interface SidebarToggleProps extends HTMLAttributes<HTMLButtonElement> {}

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, style, ...props }, ref) => {
    const { collapsed, setCollapsed } = useSidebarContext();

    const toggleStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      background: 'transparent',
      border: '1px solid var(--ud-border)',
      borderRadius: borderRadius.sm,
      cursor: 'pointer',
      color: 'var(--ud-text-muted)',
      transition: transitions.colors,
      ...style,
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn('ud-sidebar-toggle', className)}
        style={toggleStyle}
        {...props}
      >
        {collapsed ? <Icons.ChevronRight size="sm" /> : <Icons.ChevronLeft size="sm" />}
      </button>
    );
  }
);

SidebarToggle.displayName = 'SidebarToggle';
