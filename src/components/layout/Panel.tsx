import React, { forwardRef, HTMLAttributes, ReactNode, useState, useRef } from 'react';
import { textStyles } from '../../tokens/typography';
import { borderRadius, transitions } from '../../tokens/shapes';
import { spacing } from '../../tokens/spacing';
import { cn } from '../../utils/cn';
import { Icons } from '../primitives/Icon';

export type PanelPosition = 'left' | 'right' | 'bottom';

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Panel title */
  title?: string;
  /** Panel position */
  position?: PanelPosition;
  /** Whether panel is collapsible */
  collapsible?: boolean;
  /** Whether panel is collapsed */
  collapsed?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Whether panel is resizable */
  resizable?: boolean;
  /** Minimum size when resizable */
  minSize?: number;
  /** Maximum size when resizable */
  maxSize?: number;
  /** Default size */
  defaultSize?: number;
  /** Actions to show in header */
  actions?: ReactNode;
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      title,
      position = 'right',
      collapsible = true,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      resizable = false,
      minSize = 200,
      maxSize = 600,
      defaultSize = 300,
      actions,
      className,
      style,
      children,
      ...props
    },
    _ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const [size, setSize] = useState(defaultSize);
    const [isResizing, setIsResizing] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    const collapsed = controlledCollapsed ?? internalCollapsed;

    const toggleCollapsed = () => {
      const newCollapsed = !collapsed;
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(newCollapsed);
      }
      onCollapsedChange?.(newCollapsed);
    };

    // Resize handling
    const handleMouseDown = (e: React.MouseEvent) => {
      if (!resizable) return;
      e.preventDefault();
      setIsResizing(true);

      const startPos = position === 'bottom' ? e.clientY : e.clientX;
      const startSize = size;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentPos = position === 'bottom' ? moveEvent.clientY : moveEvent.clientX;
        let delta = position === 'left' ? currentPos - startPos : startPos - currentPos;
        if (position === 'bottom') delta = startPos - currentPos;

        const newSize = Math.min(maxSize, Math.max(minSize, startSize + delta));
        setSize(newSize);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const isHorizontal = position === 'left' || position === 'right';
    const collapsedSize = '40px';

    const panelStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      [isHorizontal ? 'width' : 'height']: collapsed ? collapsedSize : size,
      [isHorizontal ? 'minWidth' : 'minHeight']: collapsed ? collapsedSize : minSize,
      background: 'var(--ud-surface)',
      borderLeft: position === 'right' ? '1px solid var(--ud-border)' : undefined,
      borderRight: position === 'left' ? '1px solid var(--ud-border)' : undefined,
      borderTop: position === 'bottom' ? '1px solid var(--ud-border)' : undefined,
      transition: isResizing ? 'none' : `all ${transitions.duration.normal}`,
      overflow: 'hidden',
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      padding: `${spacing[2]} ${spacing[3]}`,
      borderBottom: collapsed ? 'none' : '1px solid var(--ud-border)',
      minHeight: '40px',
    };

    const titleStyle: React.CSSProperties = {
      ...textStyles.label,
      color: 'var(--ud-text)',
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...(collapsed && isHorizontal && {
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: 'rotate(180deg)',
      }),
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      overflow: 'auto',
      padding: spacing[3],
      display: collapsed ? 'none' : 'block',
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[1],
    };

    const toggleButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      padding: 0,
      background: 'transparent',
      border: 'none',
      borderRadius: borderRadius.sm,
      cursor: 'pointer',
      color: 'var(--ud-text-muted)',
      transition: transitions.colors,
    };

    const resizeHandleStyle: React.CSSProperties = {
      position: 'absolute',
      [position === 'left' ? 'right' : position === 'right' ? 'left' : 'top']: 0,
      [isHorizontal ? 'top' : 'left']: 0,
      [isHorizontal ? 'bottom' : 'right']: 0,
      [isHorizontal ? 'width' : 'height']: '4px',
      cursor: isHorizontal ? 'col-resize' : 'row-resize',
      background: isResizing ? 'var(--ud-accent)' : 'transparent',
      transition: transitions.colors,
    };

    const getCollapseIcon = () => {
      if (collapsed) {
        if (position === 'left') return <Icons.ChevronRight size="sm" />;
        if (position === 'right') return <Icons.ChevronLeft size="sm" />;
        return <Icons.ChevronDown size="sm" />;
      }
      if (position === 'left') return <Icons.ChevronLeft size="sm" />;
      if (position === 'right') return <Icons.ChevronRight size="sm" />;
      return <Icons.ChevronDown size="sm" />;
    };

    return (
      <div
        ref={panelRef}
        className={cn(
          'ud-panel',
          `ud-panel--${position}`,
          collapsed && 'ud-panel--collapsed',
          className
        )}
        style={{ ...panelStyle, position: 'relative' }}
        {...props}
      >
        {resizable && !collapsed && (
          <div
            style={resizeHandleStyle}
            onMouseDown={handleMouseDown}
            className="ud-panel-resize-handle"
          />
        )}

        <div style={headerStyle}>
          {collapsible && (
            <button
              type="button"
              onClick={toggleCollapsed}
              style={toggleButtonStyle}
              aria-label={collapsed ? 'Expand panel' : 'Collapse panel'}
            >
              {getCollapseIcon()}
            </button>
          )}
          {title && <span style={titleStyle}>{title}</span>}
          {!collapsed && actions && <div style={actionsStyle}>{actions}</div>}
        </div>

        <div style={contentStyle}>{children}</div>
      </div>
    );
  }
);

Panel.displayName = 'Panel';
