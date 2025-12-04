/**
 * UD Design System - Spacing Tokens
 *
 * Based on 8pt baseline (4px for micro adjustments)
 *
 * Density Philosophy:
 * - Not cramped – but not wasteful
 * - Whitespace is a feature – not a bug
 * - Dense only where info-heavy (extension list, for example)
 */

export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

// Component-specific spacing
export const componentSpacing = {
  // Button padding
  buttonPaddingXs: { x: spacing[2], y: spacing[1] },
  buttonPaddingSm: { x: spacing[3], y: spacing[1.5] },
  buttonPaddingMd: { x: spacing[4], y: spacing[2] },
  buttonPaddingLg: { x: spacing[6], y: spacing[3] },

  // Input padding
  inputPaddingSm: { x: spacing[2], y: spacing[1.5] },
  inputPaddingMd: { x: spacing[3], y: spacing[2] },
  inputPaddingLg: { x: spacing[4], y: spacing[3] },

  // Card/Surface padding
  cardPaddingSm: spacing[3],
  cardPaddingMd: spacing[4],
  cardPaddingLg: spacing[6],

  // Section padding
  sectionPaddingSm: spacing[6],
  sectionPaddingMd: spacing[12],
  sectionPaddingLg: spacing[16],

  // Gap between elements
  gapXs: spacing[1],
  gapSm: spacing[2],
  gapMd: spacing[4],
  gapLg: spacing[6],
  gapXl: spacing[8],

  // Stack spacing (vertical)
  stackXs: spacing[2],
  stackSm: spacing[3],
  stackMd: spacing[4],
  stackLg: spacing[6],
  stackXl: spacing[8],

  // Inline spacing (horizontal)
  inlineXs: spacing[1],
  inlineSm: spacing[2],
  inlineMd: spacing[3],
  inlineLg: spacing[4],
} as const;

// Layout spacing for page sections
export const layoutSpacing = {
  // Hero section
  heroMarginTop: spacing[16],
  heroMarginBottom: spacing[24],
  heroPadding: spacing[6],

  // Feature cards
  featureCardGap: spacing[6],
  featureCardRowGap: spacing[12],

  // List items
  listItemPadding: spacing[4],
  listItemGap: spacing[6],

  // Sidebar
  sidebarPadding: spacing[4],
  sidebarItemGap: spacing[1],

  // Toolbar
  toolbarPadding: spacing[2],
  toolbarItemGap: spacing[2],
} as const;

export type SpacingValue = keyof typeof spacing;
