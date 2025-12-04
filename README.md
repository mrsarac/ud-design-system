# UD Design System

> **Tool-first, information-dense, calm but powerful** design system inspired by Zed.dev's philosophy.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Philosophy

UD Design System is built with these core principles:

- **No color noise** – only 4 color families
- **High contrast** – white on black = legible even at small sizes
- **Single accent** – all interactive elements use the same teal
- **Neutral, not trendy** – will look the same in 5 years
- **Keyboard-first** – designed for power users
- **Minimal, not empty** – whitespace is intentional

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build
```

## Components

### Primitives
- `Text` - Typography component with semantic variants
- `Surface` - Card/panel container with elevation
- `Divider` - Visual separator
- `Icon` - SVG icon wrapper with size/color variants
- `Stack` / `VStack` / `HStack` - Flexbox layout helpers

### Buttons
- `Button` - Primary action component (primary, secondary, ghost, outline, destructive)
- `IconButton` - Square button for icons
- `ButtonGroup` - Grouped buttons with attached variant

### Forms
- `Input` - Text input with label, helper, error states
- `Textarea` - Multi-line text input
- `Select` - Dropdown select
- `Checkbox` - Checkbox with indeterminate state
- `Toggle` - Switch/toggle control

### Feedback
- `Badge` - Status indicator
- `Toast` - Notification system
- `Dialog` - Modal dialog
- `Tooltip` - Hover information

### Layout
- `Tabs` - Tab navigation (TabsList, TabsTrigger, TabsContent)
- `Sidebar` - Collapsible navigation sidebar
- `Panel` - Resizable panel with collapse

## Design Tokens

All design decisions are tokenized:

```typescript
import { tokens } from '@mustafasarac/ud-design-system';

// Colors
tokens.colors.semantic.dark.accent // #32C8CA

// Typography
tokens.typography.textStyles.h1 // { fontSize: '48px', fontWeight: 600, ... }

// Spacing
tokens.spacing.base[4] // '16px'

// Shapes
tokens.shapes.borderRadius.md // '6px'
```

## Theming

```tsx
import { ThemeProvider, useTheme } from '@mustafasarac/ud-design-system';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <MyApp />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

## Color Palette

| Token | Dark | Light |
|-------|------|-------|
| Background | `#0F0F0F` | `#FFFFFF` |
| Surface | `#1A1A1A` | `#F5F5F5` |
| Text | `#FFFFFF` | `#0F0F0F` |
| Accent | `#32C8CA` | `#2AB5B9` |
| Error | `#E63946` | `#D62828` |
| Success | `#52B788` | `#2D6A4F` |

## Inspired By

- [Zed.dev](https://zed.dev) - Tool-first design
- Bloomberg Terminal - Information density
- Sublime Text - Minimal & extensible
- Jane Street - Performance aesthetic
- IBM Carbon - Token-based system

## License

MIT - Mustafa Sarac
