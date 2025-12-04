import React, { forwardRef, HTMLAttributes, createContext, useContext, useState, ReactNode } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';

// Context for Tabs state
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

// Tabs Root
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Default active tab value */
  defaultValue?: string;
  /** Controlled active tab value */
  value?: string;
  /** Callback when tab changes */
  onValueChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue = '', value, onValueChange, className, style, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value ?? internalValue;

    const setActiveTab = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const tabsStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    };

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div ref={ref} className={cn('ud-tabs', className)} style={tabsStyle} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// TabsList
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Variant style */
  variant?: 'default' | 'pills' | 'underline';
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant = 'default', className, style, children, ...props }, ref) => {
    const listStyles: Record<string, React.CSSProperties> = {
      default: {
        display: 'flex',
        gap: spacing[1],
        padding: spacing[1],
        background: 'var(--ud-surface)',
        borderRadius: borderRadius.md,
        border: '1px solid var(--ud-border)',
      },
      pills: {
        display: 'flex',
        gap: spacing[2],
      },
      underline: {
        display: 'flex',
        gap: spacing[4],
        borderBottom: '1px solid var(--ud-border)',
      },
    };

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn('ud-tabs-list', `ud-tabs-list--${variant}`, className)}
        style={{ ...listStyles[variant], ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

// TabsTrigger
export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Value that identifies this tab */
  value: string;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Icon to show before label */
  icon?: ReactNode;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, icon, className, style, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      padding: `${spacing[2]} ${spacing[3]}`,
      background: isActive ? 'var(--ud-accent)' : 'transparent',
      color: isActive ? 'var(--ud-accent-text)' : 'var(--ud-text-secondary)',
      border: 'none',
      borderRadius: borderRadius.sm,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: transitions.colors,
      ...textStyles.button,
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && setActiveTab(value)}
        className={cn('ud-tabs-trigger', isActive && 'ud-tabs-trigger--active', className)}
        style={triggerStyle}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

// TabsContent
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Value that identifies this content */
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, style, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    const contentStyle: React.CSSProperties = {
      padding: `${spacing[4]} 0`,
      animation: 'ud-fade-in 150ms ease-out',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn('ud-tabs-content', className)}
        style={contentStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
