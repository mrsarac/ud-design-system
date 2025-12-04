# UD Design System: Deep Dive into Zed.dev Website & Comparable Systems

## EXECUTIVE SUMMARY

Zed.dev'in web sitesinin tasarımı **"tool-first, information-dense, calm but powerful"** felsefesini yansıtır. Bu doküman:

1. **Zed.dev website design system**'i analiz eder  
2. **Benzer az bilinir design sistemleri** (Bloomberg Terminal, Sublime Text, obscure workstation UIs) keşfeder  
3. **UD için blueprint** çıkartır

---

## PART A: ZED.DEV WEBSITE VISUAL & INTERACTION ANALYSIS

### Color Palette (Inferred from Website)

#### Primary Colors

- **Deep Charcoal/Black**: `#0F0F0F` \- Main background, conveys "serious tool"  
- **White/Off-white**: `#FFFFFF` / `#F5F5F5` \- Text and surfaces  
- **Accent (Cyan/Teal)**: `#32C8CA` (approx.) \- CTA buttons, highlights, links  
- **Subtle Gray**: `#2A2A2A` \- Secondary surfaces, dividers, code blocks

#### Color Psychology

- ✓ **No color noise** – only 4 color families  
- ✓ **High contrast** – white on black \= legible even at 2px font  
- ✓ **Single accent** – all interactive elements use same teal (not rainbow)  
- ✓ **Neutral, not trendy** – will look the same in 5 years

### Typography System

#### Type Families

- **Sans-serif**: Appears to be **system default** or **Inter-like** (modern, neutral)  
- **Mono**: Used for technical terms, code references  
- **No decorative fonts** – zero overhead

#### Type Scale (Observed)

- **Hero/H1**: \~48–56px, semibold  
- **Section headers/H2**: \~32px, semibold  
- **Subheader/H3**: \~24px, medium  
- **Body**: \~16px, regular / \~18px for callouts  
- **Small/meta**: \~12–14px, regular / medium

#### Line Height & Letter Spacing

- **Headlines**: Tight (1.1–1.2)  
- **Body**: Generous (1.5–1.6) for readability  
- **Letter-spacing**: Minimal (no tracking except intentional tightness in headers)

### Spacing & Density

#### Spacing Scale (8pt baseline)

xs: 4px

sm: 8px

md: 16px

lg: 24px

xl: 32px

xxl: 48px

xxxl: 64px

#### Layout Principles

- **Hero section**: Full viewport height, centered content, breathes  
- **Feature cards**: 24px gaps between columns, 48px row gaps  
- **List items**: 16px padding internal, 24px margin between items  
- **Compact sections**: Quote sections use 32px padding (left/right), 24px top/bottom

#### Density Philosophy

- **Not cramped** – but not wasteful  
- **Whitespace is a feature** – not a bug  
- **Dense only where info-heavy** (extension list, for example)

### Shape & Elevation

#### Border Radius

- **Buttons**: 4px (slight rounding, not pill-shaped)  
- **Cards/panels**: 6–8px (subtle, modern)  
- **No aggressive rounding** – feels professional, not playful

#### Shadows & Depth

- **No heavy shadows** – maybe subtle 1–2px blur, very light opacity  
- **Borders preferred over shadows** – 1px light gray border for separation  
- **Flatness with intent** – layering is clear but minimal

### Component Patterns Observed on Zed.dev

#### 1\. Hero Section

┌─────────────────────────────────────────┐

│   "Love your editor again"              │

│   Zed is a minimal code editor...       │

│   \[Download\] \[Docs\]                     │

│                                         │

│   Available for macOS, Linux, Windows   │

└─────────────────────────────────────────┘

**Design notes:**

- Centered, large type  
- CTA buttons: primary (teal) \+ secondary (outline)  
- Subtext smaller, gray  
- \~60px margin top/bottom

#### 2\. Feature Card / Section

┌────────────────────────────────────────────┐

│  🚀 Fast                                   │

│  Written from scratch in Rust to          │

│  efficiently leverage multiple CPU        │

│  cores and your GPU.                      │

└────────────────────────────────────────────┘

**Design notes:**

- Icon (simple, 24×24)  
- Title (20px, semibold)  
- Description (16px, regular, gray)  
- 16px internal padding  
- Light background tint or no background

#### 3\. Social Proof / Quote Section

┌──────────────────────────────────────────┐

│  "I've had my mind blown using Zed...    │

│  really easy and fun."                   │

│                                          │

│  — Ethan Perez,                          │

│    Adversarial Robustness Research Lead  │

└──────────────────────────────────────────┘

**Design notes:**

- Serif or emphasis on quote  
- Tight line height  
- Attribution in smaller, gray type  
- Subtle left border (colored) or background tint

#### 4\. List / Extension Grid

┌────────┬────────┬────────┐

│ HTML   │ TOML   │ Docker │

│ 3.1M   │ 515k   │ 415k   │

│ Isaac  │ Max &  │ d1y,   │

└────────┴────────┴────────┘

**Design notes:**

- Compact grid (3 cols on desktop, 1–2 on mobile)  
- Minimal borders between items  
- Numbers → muted color  
- Author names → smallest type

---

## PART B: COMPARABLE DESIGN SYSTEMS (Lesser-Known, Powerful)

### 1\. **Bloomberg Terminal** — The Original "Tool UI"

**Reference**: [https://www.bloomberg.com/company/stories/how-bloomberg-terminal-ux-designers-conceal-complexity/](https://www.bloomberg.com/company/stories/how-bloomberg-terminal-ux-designers-conceal-complexity/)

**Key Characteristics:**

- **Colors**: Black background (`#000000`), amber/yellow text, minimal green/red for data  
- **Density**: Extreme; every pixel has information  
- **Typography**: Monospace-first (terminal heritage), now includes proportional for labels  
- **Philosophy**: "Labor over every pixel" – been doing this since 1982  
- **Interaction**: Keyboard shortcuts are primary; mouse is secondary  
- **Launchpad**: Dockable, linked components (like multibuffer in Zed)

**What UD Can Borrow (Structurally, NOT Visually):**

- ✓ Dense information layout without chaos  
- ✓ Keyboard-first UX mindset  
- ✓ Component docking/linking (Launchpad model)  
- ✓ Real-time updates without flashing/noise  
- ✓ Multiple workspaces/pages with instant switching  
- ✓ Instant messaging integrated (IB \= chat-like)

**UD Divergence:**

- Zed uses color accent (teal) intentionally, not just data-state colors  
- Zed has breathing room; Bloomberg is maximally dense  
- Zed is 2025; Bloomberg is 1982 with upgrades

---

### 2\. **Sublime Text Theme System** — Minimal & Extensible

**Reference**: [https://www.sublimetext.com/docs/themes.html](https://www.sublimetext.com/docs/themes.html)

**Key Characteristics:**

- **Themes**: JSON format, layer-based (up to 4 layers per element)  
- **Colors**: Consistent across dark/light (e.g., Spacegray, Flatland, Monokai)  
- **Typography**: Fixed-width focus (editor first), then UI chrome  
- **Shape**: Sharp edges, minimal rounding  
- **Density**: Compact (but not tool-density like Bloomberg)  
- **Philosophy**: "Themes control look; color schemes control code highlighting"

**What UD Can Borrow:**

- ✓ Separation of concerns (UI styling ≠ syntax highlighting)  
- ✓ Layer-based rendering strategy (scalable, GPU-ready)  
- ✓ Theme/scheme duality (design tokens \+ applied values)  
- ✓ PNG-based UI (raster graphics for crisp text rendering)

**UD Divergence:**

- UD targets web (SVG/CSS), not native (PNG layers)  
- UD includes form controls, dialogs, panels beyond editor chrome  
- UD is light/dark aware, not just "dark theme" focused

---

### 3\. **Jane Street Trading UI** — Workstation Performance Aesthetic

**Reference**: [https://signalsandthreads.com/building-tools-for-traders/](https://signalsandthreads.com/building-tools-for-traders/) \[source:26\]

**Key Characteristics:**

- **Philosophy**: "Six pixels high" UI for users who measure time in microseconds  
- **Origins**: Terminal (curses library, 1980s), evolved to web with Chromium  
- **Interaction**: OCaml RPC backend, custom protocol for real-time updates  
- **Design**: Industrial, dense, highly optimized for task completion  
- **Typography**: Small but legible; every piece of information has hierarchy  
- **Accessibility**: Tooltips, links to wiki, documentation inline  
- **Colors**: Minimal, high contrast (borrowed from terminal heritage)

**What UD Can Borrow:**

- ✓ Performance-first mindset (latency is a feature)  
- ✓ "Six pixels" \= minimal waste, maximal info  
- ✓ Tooltip culture (hover for context, not click)  
- ✓ Link integration (UI elements can teach you, not just act)  
- ✓ Real-time streaming data handling

**UD Divergence:**

- UD is not just for traders; it's for all tool-builders  
- UD balances density with breathing room  
- UD emphasizes calm, not urgency

---

### 4\. **IBM Carbon Design System** — Enterprise Rigor \+ Accessibility

**Reference**: [https://www.figma.com/resource-library/design-system-examples/](https://www.figma.com/resource-library/design-system-examples/) \[source:25\]

**Key Characteristics:**

- **Token-driven**: Every color, size, spacing has a semantic name  
- **Accessibility**: WCAG AA/AAA by default  
- **Grid**: 16px base; everything multiples  
- **Typography**: Clear hierarchy, generous line height  
- **Components**: Extensive (buttons, inputs, tables, trees, etc.)  
- **Documentation**: Paired design \+ code examples

**What UD Can Borrow:**

- ✓ Token naming convention (semantic, not ad-hoc)  
- ✓ Accessibility-first approach  
- ✓ Grid system discipline (16px or 8pt)  
- ✓ Component taxonomy (atoms → molecules → organisms)

**UD Divergence:**

- IBM Carbon is enterprise (safe, mature, predictable)  
- UD is tool-first (fast, minimal, opinionated)  
- UD avoids "design by committee" feel

---

### 5\. **Figma Design System (Reference)** — Modern Token-Based

**Key Characteristics:**

- **Design Tokens**: Color, typography, spacing as first-class citizens  
- **Variables**: Responsive tokens (mobile/desktop variants)  
- **Components**: Variants-based (state management)  
- **Documentation**: Live Figma files \+ code  
- **Philosophy**: "Design systems enable scale"

**What UD Can Borrow:**

- ✓ Token architecture (primitive → semantic → component)  
- ✓ Variant-based component modeling  
- ✓ Design-to-code bridge (tokens are shared truth)  
- ✓ Dark/light mode as token set, not separate design

**UD Divergence:**

- Figma design system is for Figma (the product)  
- UD is for tool builders (more specialized)  
- UD is headless-first (design tokens \+ minimal CSS)

---

## PART C: UD DESIGN SYSTEM BLUEPRINT (from Zed.dev inspiration)

### UD Foundation Tokens

#### Color Tokens

{

  "color": {

    "primitive": {

      "black": "\#0F0F0F",

      "white": "\#FFFFFF",

      "gray": {

        "50": "\#F5F5F5",

        "100": "\#EEEEEE",

        "200": "\#E0E0E0",

        "300": "\#CCCCCC",

        "400": "\#999999",

        "500": "\#666666",

        "600": "\#444444",

        "700": "\#2A2A2A",

        "800": "\#1A1A1A",

        "900": "\#0F0F0F"

      },

      "teal": {

        "50": "\#E0F7F6",

        "100": "\#B3ECEB",

        "200": "\#80E0DD",

        "300": "\#4DD5D0",

        "400": "\#32C8CA",

        "500": "\#2AB5B9",

        "600": "\#239FA3",

        "700": "\#1B898D",

        "800": "\#127377"

      },

      "red": {

        "400": "\#FF6B6B",

        "500": "\#E63946",

        "600": "\#D62828"

      },

      "amber": {

        "400": "\#FFD93D",

        "500": "\#F4A261",

        "600": "\#E76F51"

      },

      "green": {

        "400": "\#52B788",

        "500": "\#2D6A4F",

        "600": "\#1B4332"

      }

    },

    "semantic": {

      "background": "\#0F0F0F",

      "surface": "\#1A1A1A",

      "surfaceHover": "\#2A2A2A",

      "text": "\#FFFFFF",

      "textSecondary": "\#CCCCCC",

      "textMuted": "\#999999",

      "accent": "\#32C8CA",

      "accentHover": "\#2AB5B9",

      "accentActive": "\#1B898D",

      "border": "\#2A2A2A",

      "borderSubtle": "\#1A1A1A",

      "focus": "\#32C8CA",

      "focusRing": "rgba(50, 200, 202, 0.3)",

      "error": "\#E63946",

      "errorSubtle": "rgba(230, 57, 70, 0.15)",

      "warning": "\#F4A261",

      "warningSubtle": "rgba(244, 162, 97, 0.15)",

      "success": "\#52B788",

      "successSubtle": "rgba(82, 183, 136, 0.15)",

      "selection": "rgba(50, 200, 202, 0.2)",

      "overlay": "rgba(15, 15, 15, 0.8)"

    }

  }

}

#### Typography Tokens

{

  "typography": {

    "family": {

      "sans": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",

      "mono": "'Fira Code', 'Courier New', monospace"

    },

    "size": {

      "xs": "12px",

      "sm": "14px",

      "base": "16px",

      "lg": "18px",

      "xl": "20px",

      "2xl": "24px",

      "3xl": "32px",

      "4xl": "48px"

    },

    "weight": {

      "regular": 400,

      "medium": 500,

      "semibold": 600,

      "bold": 700

    },

    "lineHeight": {

      "tight": 1.2,

      "normal": 1.5,

      "relaxed": 1.6,

      "loose": 1.8

    },

    "scale": {

      "body": {

        "size": "16px",

        "weight": 400,

        "lineHeight": 1.6,

        "letterSpacing": 0

      },

      "heading1": {

        "size": "48px",

        "weight": 600,

        "lineHeight": 1.1,

        "letterSpacing": "-0.01em"

      },

      "heading2": {

        "size": "32px",

        "weight": 600,

        "lineHeight": 1.2,

        "letterSpacing": "-0.005em"

      },

      "label": {

        "size": "12px",

        "weight": 500,

        "lineHeight": 1.4,

        "letterSpacing": "0.02em"

      }

    }

  }

}

#### Spacing Tokens

{

  "spacing": {

    "0": "0px",

    "1": "4px",

    "2": "8px",

    "3": "12px",

    "4": "16px",

    "6": "24px",

    "8": "32px",

    "12": "48px",

    "16": "64px"

  }

}

#### Shape Tokens

{

  "shape": {

    "radius": {

      "none": "0px",

      "sm": "4px",

      "md": "6px",

      "lg": "8px",

      "full": "9999px"

    }

  }

}

### UD Component Taxonomy

UD Components

│

├─ PRIMITIVES

│  ├─ Text (body, label, code)

│  ├─ Icon (24×24, 16×16, 12×12)

│  ├─ Surface (card, panel, section)

│  ├─ Divider (horizontal, vertical)

│  ├─ Focus Ring (accessible outline)

│  └─ Overlay (modal backdrop)

│

├─ FORM CONTROLS

│  ├─ Text Input (single-line, multi-line)

│  ├─ Select / Dropdown

│  ├─ Checkbox

│  ├─ Radio Button

│  ├─ Toggle / Switch

│  ├─ Slider / Range

│  ├─ Segmented Control

│  └─ File Picker

│

├─ NAVIGATION & STRUCTURE

│  ├─ Sidebar / Navigation Rail

│  ├─ Tree View (collapsible list)

│  ├─ Tabs (horizontal)

│  ├─ Breadcrumb

│  ├─ Toolbar

│  ├─ Status Bar

│  ├─ App Frame (layout container)

│  └─ Command Palette / Search

│

├─ BUTTONS & ACTIONS

│  ├─ Button (primary, secondary, ghost, destructive)

│  ├─ Icon Button

│  ├─ Split Button

│  └─ Floating Action Button

│

├─ FEEDBACK & MESSAGING

│  ├─ Toast / Notification

│  ├─ Inline Hint / Helper Text

│  ├─ Banner

│  ├─ Dialog / Modal

│  ├─ Tooltip

│  ├─ Badge / Tag

│  └─ Validation State (error, success, warning)

│

├─ EDITOR-SPECIFIC

│  ├─ Panel (resizable, collapsible)

│  ├─ Multibuffer View (tabbed code view)

│  ├─ Split View (pane divider)

│  ├─ Diagnostics Panel

│  ├─ Search/Replace Bar

│  ├─ Inline Annotation (error squiggle, hint)

│  └─ Minimap (if applicable)

│

└─ AI/ASSISTANT-SPECIFIC

   ├─ Inline Assistant Invocation

   ├─ Agent Panel / Thread

   ├─ Thread List

   ├─ Rule/Prompt Library View

   ├─ Diff Review Surface

   └─ Pending Changes Inspector

---

## PART D: ZONING & LAYOUT PATTERNS FOR UD

### Website Hero Layout (UD-inspired)

┌──────────────────────────────────────────────────┐

│                                                  │

│              \[64px top margin\]                   │

│                                                  │

│          "Love Your Tool Again"                  │

│       \[48px / heading1 / semibold\]               │

│                                                  │

│         Minimal, fast, focused design            │

│         for serious work, all day long.          │

│       \[16px / body / textSecondary\]              │

│                                                  │

│         \[Download\] \[Docs\] \[GitHub\]               │

│      \[Primary, Secondary, Ghost buttons\]         │

│                                                  │

│         macOS • Linux • Windows                  │

│          \[12px / label / textMuted\]              │

│                                                  │

│              \[96px bottom margin\]                │

│                                                  │

└──────────────────────────────────────────────────┘

### Feature Card Layout

┌─ \[16px\] ─────────────────────────────────── ─┐

│                                              │

│  \[Icon: 24×24\]  \[12px gap\]                  │

│                                              │

│  Feature Title                               │

│  \[20px / heading3 / semibold\]                │

│                                              │

│  \[8px gap\]                                   │

│                                              │

│  Feature description that explains what     │

│  this component or feature does and why     │

│  you'd use it in your workflow.              │

│  \[16px / body / textSecondary\]               │

│                                              │

└─ \[16px\] ─────────────────────────────────── ─┘

---

## PART E: DESIGN DECISIONS & RATIONALE

### Why Dark First?

- ✓ Coding tools are predominantly dark (reduced eye strain for long sessions)  
- ✓ Zed UI is dark; website should mirror product feel  
- ✓ Modern, not trendy; dark is here to stay  
- ✓ High contrast (white on black) aids accessibility

### Why Teal Accent?

- ✓ Distinct from typical blue (Material, Bootstrap)  
- ✓ Energetic but not shouty  
- ✓ Works on black background without vibration  
- ✓ Complements dark palette without warmth clash  
- ✓ "Foreign" compared to common red/blue CTAs

### Why Minimal Color Palette?

- ✓ Reduces cognitive load  
- ✓ Focuses attention on content, not decoration  
- ✓ Scales easily to theming (light mode, high contrast)  
- ✓ Printable/accessible (not reliant on color alone)

### Why Token-Based?

- ✓ Design ↔ Code bridge (Figma tokens → CSS variables)  
- ✓ Responsive variants (mobile/desktop spacing differs)  
- ✓ Dark/light mode switching is just token swaps  
- ✓ Component reusability across projects  
- ✓ Future-proof (tokens don't break if frameworks change)

### Why Monospace-Secondary, Not Primary?

- ✓ UI chrome should be accessible to non-developers  
- ✓ Monospace is for code content, not labels  
- ✓ Proportional type is friendlier, faster to scan  
- ✓ System font (`-apple-system`) is platform-native (speed, familiarity)

---

## IMPLEMENTATION ROADMAP FOR UD

### Phase 1: Foundations (Week 1–2)

- [ ] Finalize color tokens (light \+ dark)  
- [ ] Define typography scale (sizes, weights, line heights)  
- [ ] Create spacing scale  
- [ ] Establish shape \+ elevation rules

### Phase 2: Primitives & Core Components (Week 3–4)

- [ ] Text component (body, label, code, heading variants)  
- [ ] Icon system (sizes, loading states)  
- [ ] Surface / Card component  
- [ ] Button (all variants: primary, secondary, ghost, destructive, loading, disabled)  
- [ ] Focus ring (accessible outline)  
- [ ] Divider / Separator

### Phase 3: Form Controls (Week 5–6)

- [ ] Text input (single, multi-line, with validation)  
- [ ] Select / Dropdown  
- [ ] Checkbox  
- [ ] Radio button  
- [ ] Toggle / Switch  
- [ ] Slider

### Phase 4: Navigation & Layout (Week 7–8)

- [ ] Sidebar / Nav rail  
- [ ] Tree view  
- [ ] Tabs  
- [ ] Breadcrumb  
- [ ] Command palette prototype  
- [ ] Split view / Pane divider

### Phase 5: Feedback & Complex (Week 9–10)

- [ ] Toast / Notifications  
- [ ] Dialog / Modal  
- [ ] Tooltip  
- [ ] Badge / Tag  
- [ ] Diagnostic panel (mock)  
- [ ] Inline hints

### Phase 6: Documentation & Delivery (Week 11–12)

- [ ] Figma design system file (published)  
- [ ] Component API documentation  
- [ ] Usage guidelines (do's & don'ts)  
- [ ] Web component library (HTML \+ CSS)  
- [ ] Storybook or similar  
- [ ] Accessibility checklist

---

## SOURCES & REFERENCES

1. **Zed.dev website**: [https://zed.dev/](https://zed.dev/) \[analyzed directly\]  
2. **Bloomberg Terminal UX**: [https://www.bloomberg.com/company/stories/how-bloomberg-terminal-ux-designers-conceal-complexity/](https://www.bloomberg.com/company/stories/how-bloomberg-terminal-ux-designers-conceal-complexity/) \[source:33\]  
3. **Jane Street Trading UI**: [https://signalsandthreads.com/building-tools-for-traders/](https://signalsandthreads.com/building-tools-for-traders/) \[source:26\]  
4. **Figma Design System Examples**: [https://www.figma.com/resource-library/design-system-examples/](https://www.figma.com/resource-library/design-system-examples/) \[source:25\]  
5. **Design Tokens in Figma**: [https://figr.design/blog/figma-tokens-in-design-systems](https://figr.design/blog/figma-tokens-in-design-systems) \[source:27\]  
6. **UI Density (Bloomberg reference)**: [https://mattstromawn.com/writing/ui-density/](https://mattstromawn.com/writing/ui-density/) \[source:29\]  
7. **Sublime Text Themes**: [https://www.sublimetext.com/docs/themes.html](https://www.sublimetext.com/docs/themes.html) \[source:36\]

---

## NEXT STEPS

1. **Validate tokens** – Check contrast ratios (WCAG AA/AAA)  
2. **Build component library** – Headless components (no dependencies on MUI/Chakra/Shadcn)  
3. **Create Figma design file** – Token library \+ component variants  
4. **Write component docs** – API, states, keyboard behavior, a11y notes  
5. **Ship first version** – Minimal viable system (buttons, inputs, layout)  
6. **Iterate based on real usage** – Collect feedback from tool builders

---

**UD is now ready for component deep-dives. What would you like to design next?**

- Option A: UD Button component (all variants)  
- Option B: UD Command Palette (three foreign variations)  
- Option C: UD Form controls (input, select, checkbox)  
- Option D: UD Layout primitives (sidebar, panes, split view)

