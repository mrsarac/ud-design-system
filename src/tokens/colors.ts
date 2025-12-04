/**
 * UD Design System - Color Tokens
 * Inspired by Zed.dev's "tool-first, information-dense, calm but powerful" philosophy
 *
 * Color Psychology:
 * - No color noise – only 4 color families
 * - High contrast – white on black = legible even at small sizes
 * - Single accent – all interactive elements use same teal
 * - Neutral, not trendy – will look the same in 5 years
 */

export const primitiveColors = {
  black: '#0F0F0F',
  white: '#FFFFFF',

  gray: {
    50: '#F5F5F5',
    100: '#EEEEEE',
    200: '#E0E0E0',
    300: '#CCCCCC',
    400: '#999999',
    500: '#666666',
    600: '#444444',
    700: '#2A2A2A',
    800: '#1A1A1A',
    900: '#0F0F0F',
  },

  teal: {
    50: '#E0F7F6',
    100: '#B3ECEB',
    200: '#80E0DD',
    300: '#4DD5D0',
    400: '#32C8CA',
    500: '#2AB5B9',
    600: '#239FA3',
    700: '#1B898D',
    800: '#127377',
  },

  red: {
    400: '#FF6B6B',
    500: '#E63946',
    600: '#D62828',
  },

  amber: {
    400: '#FFD93D',
    500: '#F4A261',
    600: '#E76F51',
  },

  green: {
    400: '#52B788',
    500: '#2D6A4F',
    600: '#1B4332',
  },
} as const;

export const semanticColors = {
  // Dark theme (default)
  dark: {
    background: primitiveColors.black,
    surface: primitiveColors.gray[800],
    surfaceHover: primitiveColors.gray[700],
    surfaceActive: primitiveColors.gray[600],

    text: primitiveColors.white,
    textSecondary: primitiveColors.gray[300],
    textMuted: primitiveColors.gray[400],
    textDisabled: primitiveColors.gray[500],

    accent: primitiveColors.teal[400],
    accentHover: primitiveColors.teal[500],
    accentActive: primitiveColors.teal[700],
    accentText: primitiveColors.black,

    border: primitiveColors.gray[700],
    borderSubtle: primitiveColors.gray[800],
    borderFocus: primitiveColors.teal[400],

    focus: primitiveColors.teal[400],
    focusRing: 'rgba(50, 200, 202, 0.3)',

    error: primitiveColors.red[500],
    errorSubtle: 'rgba(230, 57, 70, 0.15)',
    errorText: primitiveColors.red[400],

    warning: primitiveColors.amber[500],
    warningSubtle: 'rgba(244, 162, 97, 0.15)',
    warningText: primitiveColors.amber[400],

    success: primitiveColors.green[400],
    successSubtle: 'rgba(82, 183, 136, 0.15)',
    successText: primitiveColors.green[400],

    selection: 'rgba(50, 200, 202, 0.2)',
    overlay: 'rgba(15, 15, 15, 0.8)',
  },

  // Light theme
  light: {
    background: primitiveColors.white,
    surface: primitiveColors.gray[50],
    surfaceHover: primitiveColors.gray[100],
    surfaceActive: primitiveColors.gray[200],

    text: primitiveColors.gray[900],
    textSecondary: primitiveColors.gray[600],
    textMuted: primitiveColors.gray[500],
    textDisabled: primitiveColors.gray[400],

    accent: primitiveColors.teal[500],
    accentHover: primitiveColors.teal[600],
    accentActive: primitiveColors.teal[700],
    accentText: primitiveColors.white,

    border: primitiveColors.gray[200],
    borderSubtle: primitiveColors.gray[100],
    borderFocus: primitiveColors.teal[500],

    focus: primitiveColors.teal[500],
    focusRing: 'rgba(42, 181, 185, 0.3)',

    error: primitiveColors.red[600],
    errorSubtle: 'rgba(214, 40, 40, 0.1)',
    errorText: primitiveColors.red[600],

    warning: primitiveColors.amber[600],
    warningSubtle: 'rgba(231, 111, 81, 0.1)',
    warningText: primitiveColors.amber[600],

    success: primitiveColors.green[500],
    successSubtle: 'rgba(45, 106, 79, 0.1)',
    successText: primitiveColors.green[500],

    selection: 'rgba(50, 200, 202, 0.15)',
    overlay: 'rgba(255, 255, 255, 0.8)',
  },
} as const;

export type ThemeMode = 'dark' | 'light';
export type SemanticColor = keyof typeof semanticColors.dark;
export type PrimitiveColor = typeof primitiveColors;
