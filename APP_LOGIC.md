# Portfolio App Logic Documentation

## Purpose
This document explains how the React SPA works at runtime, including routing, shared layout, theme and sound behavior, and how page content is assembled from data files. It is based on the implementation in `src/` and follows the architecture intent described in `specDoc.md` and `AGENTS.md`.

## High-Level Architecture
The app uses a component-first SPA architecture with React Router, a global theme context, and data-driven page content.

Core flow:
1. `src/main.jsx` bootstraps the app and loads global styles and design tokens.
2. `src/App.jsx` creates the route tree and wraps the router in `ThemeProvider`.
3. `src/components/layout/AppLayout.jsx` provides a persistent page shell (`Header`, `main`, `Footer`) and renders route content via `<Outlet />`.
4. Page components under `src/pages/` render content and interactions.
5. Shared hooks (`useSound`, `useTheme`) and data modules (`siteContent`, `projects`) keep logic reusable and centralized.

## App Entry and Global Styles
### `src/main.jsx`
- Mounts the app with React Strict Mode.
- Imports:
  - `src/styles/tokens.css` for spacing, typography, transitions, and token variables.
  - `src/styles/globals.css` for font faces, theme color variables, resets, focus styles, and reduced-motion handling.
  - `src/index.css` for app-level style additions.

### Why this matters
- Tokens and global styles load before page rendering, so typography, colors, and transitions are consistent across all routes.
- `globals.css` defines both light and dark theme CSS variables and responds to `data-theme` on the root element.

## Routing and Layout Logic
### `src/App.jsx`
Router is defined with `createBrowserRouter` and nested routes:
- `/` -> `HomePage`
- `/about` -> `AboutResumePage`
- `/portfolio` -> `PortfolioPage`
- `/contact` -> `ContactPage`
- `/credits` -> `CreditsPage`
- `*` -> `NotFoundPage`

The router is wrapped by `ThemeProvider`, so all routes can read and update theme state.

### `src/components/layout/AppLayout.jsx`
- Renders persistent layout structure:
  - `<Header />`
  - `<main className="main-content">` with `<Outlet />`
  - `<Footer />`

### Why this matters
- Navigation and footer controls remain available across route changes.
- Only the route content inside `<Outlet />` changes, which simplifies shared behavior and styling.

## Global Theme System
### `src/contexts/ThemeContext.jsx`
`ThemeProvider` owns global theme state and behavior.

Initialization order:
1. Read `localStorage.getItem('theme')`.
2. If not set, check `window.matchMedia('(prefers-color-scheme: dark)')`.
3. Default to `light`.

On theme changes:
- Writes `data-theme` on `document.documentElement`.
- Persists the selected theme in `localStorage`.

Exports:
- `theme` (`light` or `dark`)
- `toggleTheme()`
- `useTheme()` hook with guard that throws if used outside provider.

### `src/components/layout/ThemeToggle.jsx`
- Reads `theme` and `toggleTheme` via context.
- Plays click sound through `useSound`.
- Updates mode on click with accessible `aria-label`/`title`.

## Sound Interaction System
### `src/hooks/useSound.js`
`useSound` encapsulates menu/link click audio behavior.

State and persistence:
- `soundEnabled` initializes from `localStorage` (defaults to `true`).
- Persists `soundEnabled` changes to `localStorage`.

Audio setup:
- Creates `new Audio(menuClickSound)` in a mount effect.
- Sets default volume to `0.5`.

Runtime behavior:
- `playClickSound()` resets audio to `currentTime = 0` and plays only when enabled.
- `toggleSound()` flips enabled state.

Consumers:
- `NavMenu` plays sound on route link clicks.
- `Footer` plays sound on credits link and also exposes sound on/off toggle.
- `ThemeToggle` plays sound when switching theme.
- Pages use it for in-page and external link interactions.

## Data Layer
### `src/data/siteContent.js`
Central content object used by pages:
- Hero text
- About bio/skills/experience/education
- Resume URL
- Contact email and social links

### `src/data/projects.js`
Project metadata array used by Portfolio and Home page logic:
- IDs, titles, summaries, stack, links
- Category for filtering
- `featured` flag for prioritization

### Why this matters
- Content updates are mostly data edits, not component rewrites.
- Rendering logic stays clean and reusable.

## Page Logic by Route
### Home (`src/pages/HomePage.jsx`)
- Reads theme from context to switch logo variant (`logo` vs `logoDark`).
- Reads hero text from `siteContent`.
- Computes `featuredProjects` from `projects` (filtered + sliced) for future featured-project rendering.
- Uses `useSound` for click interaction.

### About & Resume (`src/pages/AboutResumePage.jsx`)
- Uses a local side navigation with anchor links to sections (`#bio`, `#skills`, etc.).
- Renders bio, skills, experience, and education from `siteContent.about`.
- Chooses portrait asset based on current theme.
- Provides downloadable resume link via `siteContent.about.resumeUrl`.

### Portfolio (`src/pages/PortfolioPage.jsx`)
- Maintains local `filter` state (`all` by default).
- Derives available categories from `projects`.
- Filters project list by selected category.
- Renders project cards with optional image and optional live/code links.
- Plays click sound for filter changes and external links.

### Contact (`src/pages/ContactPage.jsx`)
- Renders email and social links from `siteContent.contact`.
- Uses sound hook for link click interactions.

### Credits (`src/pages/CreditsPage.jsx`)
- Static attribution content for sound/font/tooling credits.

### Not Found (`src/pages/NotFoundPage.jsx`)
- Handles unmatched routes and offers navigation back to home.

## Navigation and Footer Behavior
### `src/components/layout/NavMenu.jsx`
- Primary SPA navigation using React Router `<Link>`.
- Calls `playClickSound()` on navigation interactions.

### `src/components/layout/Footer.jsx`
- Displays current year and credits link.
- Includes accessible sound toggle button with dynamic label/title and icon.

## Accessibility and UX Logic
Implemented patterns aligned with project guidance:
- Semantic landmarks via header/main/footer layout.
- Keyboard-visible focus styles in global CSS (`:focus-visible`).
- `prefers-reduced-motion` handling in global CSS to reduce transition/animation duration.
- Theme toggle and sound toggle provide accessible labels.
- External links in portfolio/contact/credits use `target="_blank"` with `rel="noopener noreferrer"`.

## State and Data Flow Summary
1. App initializes in `main.jsx` and `App.jsx`.
2. Router selects page component by URL.
3. `AppLayout` wraps page with shared header/footer.
4. Theme state flows from `ThemeProvider` to all consumers.
5. Sound preferences are read/persisted per hook consumer via `localStorage`.
6. Page components read data from `siteContent`/`projects` and render derived UI.

## Current Implementation Notes
- Theme persistence and system preference behavior are implemented.
- Sound effect playback with user toggle is implemented.
- Data-driven About, Portfolio, and Contact content is implemented.
- Base reduced-motion support exists globally.
- Route transition animation logic described in `specDoc.md` is not currently implemented in route components.

## Suggested Maintenance Workflow
When updating this app, prefer this sequence:
1. Update data content in `src/data/` when text or project metadata changes.
2. Update page components only for structural/interaction changes.
3. Keep shared behavior in hooks/context (`useSound`, `ThemeContext`) instead of duplicating page logic.
4. Verify accessibility for any new interactive element (`aria-label`, keyboard focus, color contrast).
5. Run `npm run lint` and `npm run build` before merging.
