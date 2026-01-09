# CSS Architecture for Chrome Extension

## Overview

This Chrome extension uses **separate CSS files** for different runtime environments to ensure proper styling isolation and optimal performance.

## CSS File Structure

```
src/
├── popup/
│   └── popup.css          # Styles for popup UI (popup.html)
├── side-panel/
│   └── sidePanel.css      # Styles for side panel UI (sidePanel.html)
└── content/
    └── content.css        # Styles for content script (Shadow DOM)
```

## Why Separate CSS Files?

### 1. **Different Runtime Contexts**

Your extension runs in **three different environments**:

| Environment        | CSS File        | Root Selector | Context                                          |
| ------------------ | --------------- | ------------- | ------------------------------------------------ |
| **Popup**          | `popup.css`     | `:root`       | Extension popup window (600x600px)               |
| **Side Panel**     | `sidePanel.css` | `:root`       | Browser side panel (full height, variable width) |
| **Content Script** | `content.css`   | `:host`       | Shadow DOM injected into web pages               |

### 2. **Isolation Requirements**

- **Extension Pages (Popup & Side Panel)**: Run in isolated extension contexts with their own DOM
- **Content Script**: Runs in a Shadow DOM to avoid conflicts with host page styles

### 3. **Different Layout Constraints**

```css
/* popup.css - Fixed size popup */
html,
body {
  @apply m-0 p-0 w-[600px] h-[600px] overflow-hidden;
}

/* sidePanel.css - Full height side panel */
html,
body {
  @apply m-0 p-0 w-full h-full overflow-auto;
}

/* content.css - Shadow DOM (no body/html constraints) */
:host {
  /* Styles applied to Shadow DOM host */
}
```

## Build Configuration

### Vite Configs

**`vite.config.ts`** - Builds popup & side panel

```typescript
rollupOptions: {
  input: {
    popup: "popup.html",      // → imports popup.css
    sidePanel: "sidePanel.html", // → imports sidePanel.css
    serviceWorker: "serviceWorker.ts"
  }
}
```

**`vite.config.content.ts`** - Builds content script

```typescript
rollupOptions: {
  input: "src/content/Content.tsx", // → imports content.css
  output: {
    format: "iife",
    assetFileNames: "content.css"
  }
}
```

## Build Output

```
dist/
├── ui/
│   ├── popup.html
│   ├── popup.css          # 59.17 kB
│   ├── popup.js
│   ├── sidePanel.html
│   ├── sidePanel.css      # 59.11 kB
│   ├── sidePanel.js
│   └── serviceWorker.js
└── content/
    ├── content.js
    └── content.css
```

## Shared Theme Variables

All three CSS files share the **same design tokens** (CSS variables):

```css
:root /* or :host */ {
  --radius: 0.625rem;
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  /* ... and more */
}
```

This ensures **visual consistency** across all extension contexts while maintaining proper isolation.

## Tailwind v4 Configuration

All CSS files use Tailwind v4 with:

```css
@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));
```

The Tailwind plugin in both Vite configs processes these imports and generates the utility classes.

## Best Practices

### ✅ DO:

- Keep separate CSS files for popup, side panel, and content script
- Use the same design tokens (CSS variables) across all files for consistency
- Use `:root` for extension pages, `:host` for Shadow DOM
- Apply appropriate layout constraints for each context

### ❌ DON'T:

- Try to share a single CSS file across all contexts
- Use `@apply` with custom classes defined outside of `@layer` (Tailwind v4 limitation)
- Mix `:root` and `:host` selectors in the same file
- Forget to update the import path when creating new entry points

## Entry Point Imports

```typescript
// src/popup/main.tsx
import "./popup.css";

// src/side-panel/sidePanel.tsx
import "./sidePanel.css";

// src/content/Content.tsx
import contentStyles from "./content.css?inline";
// Note: Content script uses ?inline to inject into Shadow DOM
```

## Modifying Styles

When you need to **change theme variables**:

1. Update the CSS variable in the `:root` or `.dark` block
2. Make the same change in all three CSS files (popup.css, sidePanel.css, content.css)
3. Run `npm run build` to see changes

When you need **environment-specific styles**:

- Modify only the relevant CSS file (e.g., popup.css for popup-only styles)

## Summary

This architecture provides:

- ✅ **Proper isolation** between extension contexts
- ✅ **Consistent theming** across all UIs
- ✅ **Optimal bundle size** (each context loads only what it needs)
- ✅ **Maintainability** with clear separation of concerns
- ✅ **Tailwind v4 compatibility** with proper syntax
