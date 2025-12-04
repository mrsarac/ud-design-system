/**
 * UD Design System - Design Tokens
 *
 * Central export for all design tokens.
 * These tokens form the foundation of the entire design system.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shapes';

// Re-export as namespaced objects for convenience
import { primitiveColors, semanticColors } from './colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles } from './typography';
import { spacing, componentSpacing, layoutSpacing } from './spacing';
import { borderRadius, borderWidth, shadows, zIndex, transitions } from './shapes';

export const tokens = {
  colors: {
    primitive: primitiveColors,
    semantic: semanticColors,
  },
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textStyles,
  },
  spacing: {
    base: spacing,
    component: componentSpacing,
    layout: layoutSpacing,
  },
  shapes: {
    borderRadius,
    borderWidth,
    shadows,
    zIndex,
    transitions,
  },
} as const;

export type Tokens = typeof tokens;
