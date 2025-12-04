/**
 * UD Design System - Shape & Elevation Tokens
 *
 * Shape Philosophy:
 * - Buttons: 4px (slight rounding, not pill-shaped)
 * - Cards/panels: 6–8px (subtle, modern)
 * - No aggressive rounding – feels professional, not playful
 *
 * Shadow Philosophy:
 * - No heavy shadows – maybe subtle 1–2px blur, very light opacity
 * - Borders preferred over shadows – 1px light gray border for separation
 * - Flatness with intent – layering is clear but minimal
 */

export const borderRadius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;

export const borderWidth = {
  0: '0px',
  1: '1px',
  2: '2px',
  4: '4px',
} as const;

// Subtle shadows - we prefer borders, but shadows are available when needed
export const shadows = {
  none: 'none',

  // Very subtle - for slight elevation
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',

  // Small - for cards on dark backgrounds
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',

  // Medium - for dropdowns, popovers
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

  // Large - for modals, dialogs
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  // Extra large - for floating panels
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Focus ring shadows
  focusRing: '0 0 0 3px rgba(50, 200, 202, 0.3)',
  focusRingError: '0 0 0 3px rgba(230, 57, 70, 0.3)',

  // Inner shadows (for pressed states)
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  innerDark: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 20,
  banner: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  toast: 70,
  tooltip: 80,
  max: 9999,
} as const;

// Transitions
export const transitions = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // Easing
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Pre-composed transitions
  default: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'background-color 200ms, border-color 200ms, color 200ms',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
export type ZIndex = keyof typeof zIndex;
