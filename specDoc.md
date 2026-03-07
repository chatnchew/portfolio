# Portfolio Website Specification

## 1. Project Summary
This project is a personal portfolio website for Caryn Harris that is currently implemented as static HTML/CSS and will be migrated to a React Single Page Application (SPA).

The current codebase includes:
- A styled home page scaffold (`01_home/index.html`, `01_home/style.css`)
- An about page placeholder (`03_about/index.html`, `03_about/style.css`)
- Brand assets and custom webfonts in `assets/`

Primary goal:
Build a performant, accessible React SPA that preserves the existing visual identity (logo + custom fonts) while adding complete page content, routing, and reusable components.

## 2. Existing Implementation Audit

### 2.1 Current Pages
1. `01_home/index.html`
- Contains centered logo and simple nav list (`home`, `about & resume`, `portfolio`).
- Uses a `.page-wrapper` and `.page-content` flex layout.

2. `03_about/index.html`
- HTML shell only, no visible content.

### 2.2 Current Styling
1. `01_home/style.css`
- Global reset.
- Defines custom fonts via `@font-face`:
	- `disclaimerplain`
	- `far_outregular`
- Home layout and nav typography styles.

2. `03_about/style.css`
- Similar reset/font definitions and base layout classes.
- Appears to be a shared baseline but is not fully used by `03_about/index.html` yet.

### 2.3 Existing Assets
1. Brand images
- `assets/images/caryn harris logo.png`
- `assets/images/caryn harris logo.svg` (vector format, preferred for React)

2. Resume
- `assets/Caryn Harris 2026.pdf`

3. Webfonts in use
- `assets/disclaimer-plain-webfont.woff`
- `assets/disclaimer-plain-webfont.woff2`
- `assets/far-out-webfont.woff`
- `assets/far-out-webfont.woff2`

4. Font kit reference files
- `assets/webfontkit-20251009-160743/*`

5. Audio assets
- `assets/842609__ui-hater2012__menuclick.wav` (click sound effect for link interactions)

### 2.4 Known Gaps in Current Static Build
1. Relative asset paths in page-level files likely need correction during migration.
- Example: `01_home/index.html` references `./assets/images/...` from inside `01_home/`, which does not match actual asset location.
- Example: `01_home/style.css` references `./assets/...` for font files; current fonts live under root `assets/`.

2. Nav links are placeholders (`href=""`) and do not navigate.
3. About page content is not implemented.
4. No project-level app shell, shared layout component, or SPA routing yet.

## 3. Product Goals and Non-Goals

### 3.1 Goals
1. Convert static pages into a React SPA.
2. Preserve existing brand identity and typography.
3. Implement complete content pages:
- Home
- About/Resume
- Portfolio
- Contact (recommended)
4. Ensure mobile-first responsive behavior.
5. Meet accessibility baseline (WCAG 2.1 AA where feasible).
6. Implement light/dark mode toggle that persists across pages and sessions.

## 4. Proposed React SPA Architecture

### 4.1 Recommended Stack
1. React 18+
2. Vite
3. React Router v6
4. Plain CSS modules or scoped component CSS
5. Optional Bootstrap integration if desired by final design direction

### 4.2 Proposed Folder Structure
```text
src/
	assets/
		images/
		fonts/
		sounds/
	components/
		layout/
			AppLayout.jsx
			Header.jsx
			NavMenu.jsx
			Footer.jsx
			ThemeToggle.jsx
		common/
			SectionTitle.jsx
			CTAButton.jsx
	pages/
		HomePage.jsx
		AboutResumePage.jsx
		PortfolioPage.jsx
		ContactPage.jsx
		CreditsPage.jsx
		NotFoundPage.jsx
	hooks/
		useTheme.js
		useSound.js
	data/
		siteContent.js
		projects.js
	styles/
		globals.css
		tokens.css
	App.jsx
	main.jsx
```

### 4.3 Routing
1. `/` -> Home
2. `/about` -> About + Resume
3. `/portfolio` -> Portfolio
4. `/contact` -> Contact (optional but recommended)
5. `/credits` -> Credits (attribution for assets)
6. `*` -> NotFound

**Page Transitions:**
- Implement fade-in/fade-out transitions between route changes
- Fade duration: 200-300ms recommended
- Ensure transitions don't delay navigation or impact perceived performance

## 5. Information Architecture and Content Requirements

### 5.1 Home Page
Required sections:
1. Hero area with logo/wordmark and short intro.
2. Primary navigation.
3. Quick links to featured projects.
4. CTA to contact or resume.

### 5.2 About + Resume Page
Required sections:
1. Biography summary.
2. Skills/competencies.
3. Experience highlights.
4. Education/certifications.
5. Resume download link (`assets/Caryn Harris 2026.pdf`).

### 5.3 Portfolio Page
Required sections:
1. Project grid/list.
2. Per project:
- Title
- Summary
- Role/stack
- Links (live/demo + repository if public)
- Thumbnail/image
3. Optional filtering by category.

### 5.4 Contact
1. Simple contact card (email + social links)

### 5.5 Credits
Required sections:
1. Page title: "Credits" or "Attributions"
2. Sound Effects section:
   - **menuClick** by ui-hater2012
   - Source: https://freesound.org/s/842609/
   - License: Attribution 4.0
3. Fonts section (if attribution required by license)
4. Any other third-party assets requiring attribution
5. Link in footer to Credits page

## 6. Visual and UX Specification

### 6.1 Brand/Typography
Logo:
1. Use `assets/images/caryn harris logo.svg` (vector format) for React implementation.
2. PNG version available as fallback if needed.

Fonts:
1. `disclaimerplain` for expressive heading/nav treatments.
2. `far_outregular` for accent or display use.
3. Add a readable fallback body stack for long text (for example: `Georgia, 'Times New Roman', serif` or a chosen sans-serif stack).

### 6.2 Layout Behavior
1. Maintain centered composition from current home concept.
2. Mobile-first breakpoints:
- Small mobile (default)
- Tablet (`min-width: 768px`)
- Desktop (`min-width: 1024px`)
3. Keep nav usable with wrapping or collapsed menu on narrow screens.
4. About and Portfolio pages should have a sidenav and main content structure [like this](https://www.w3schools.com/css/tryit.asp?filename=trycss_template4).
5. Footer should include link to Credits page for asset attributions.

### 6.3 Design Tokens (Initial)
Define CSS custom properties in `tokens.css`:
1. Colors: background, text, muted text, link, hover.
2. Typography scales for headings/body.
3. Spacing scale (`--space-1` ... `--space-8`).
4. Border radius/shadow values for cards/components.

### 6.4 Theme System (Light/Dark Mode)
1. Implement theme toggle accessible from all pages (likely in header).
2. Store preference in `localStorage` to persist across sessions.
3. Respect user's system preference on first visit (`prefers-color-scheme`).
4. Use CSS custom properties for theme-aware colors:
   - Light mode: light backgrounds, dark text
   - Dark mode: dark backgrounds, light text
5. Ensure smooth transitions between themes.
6. Maintain WCAG AA contrast ratios in both modes.

### 6.5 Interaction
1. Clear link hover/focus states.
2. Links scale up slightly on hover (e.g., `transform: scale(1.05)`) with smooth transition.
3. Soft click sound effect plays when links are clicked.
4. Keyboard-visible focus ring for all interactive elements.
5. Page transitions use fade-in/fade-out effect when navigating between routes.
6. Subtle entrance transitions only where helpful.
7. Theme toggle clearly labeled and keyboard accessible.

**Link Interaction Details:**
- Hover scale: `transform: scale(1.05)` with `transition: transform 0.2s ease`
- Sound effect: `assets/842609__ui-hater2012__menuclick.wav` (menuClick by ui-hater2012)
- Ensure sound doesn't play on keyboard navigation to avoid overwhelming screen reader users
- Provide option to disable sound effects for accessibility

**Page Transition Details:**
- Fade out current page: `opacity: 1` to `opacity: 0` (150-200ms)
- Fade in new page: `opacity: 0` to `opacity: 1` (150-200ms)
- Total transition time should not exceed 400ms to maintain responsiveness
- Respect `prefers-reduced-motion` media query to disable transitions for users who prefer minimal motion
- Consider using React Transition Group or Framer Motion for smooth route transitions

## 7. Technical Requirements

### 7.1 Accessibility
1. Semantic landmarks (`header`, `main`, `nav`, `footer`).
2. Descriptive `alt` text for all meaningful images.
3. Contrast-compliant text and links.
4. Logical heading hierarchy (`h1` to `h3` as needed).
5. Full keyboard navigation.
6. Respect `prefers-reduced-motion` for users sensitive to animations.

### 7.2 Performance
1. Optimize logo/project images.
2. Use modern image formats where practical.
3. Avoid unnecessary large dependencies.
4. Lazy load non-critical sections/components when appropriate.
5. Theme preference stored in localStorage to avoid flash of unstyled content (FOUC).

### 7.3 SEO Basics
1. Unique page titles and meta descriptions.
2. Open Graph tags for share previews.
3. Meaningful semantic content and link text.

## 8. Data Model (Frontend)

### 8.1 Project Object
```js
{
	id: 'project-slug',
	title: 'Project Title',
	summary: 'Short description',
	role: 'Designer / Developer',
	stack: ['React', 'CSS'],
	image: '/assets/images/project-thumb.png',
	liveUrl: 'https://example.com',
	repoUrl: 'https://github.com/example/repo',
	featured: true,
	category: 'web'
}
```

### 8.2 Site Content Object
Use a simple config object for:
1. Hero intro text.
2. About summary paragraphs.
3. Contact links.
4. Social URLs.

## 9. Migration Plan From Current Files

### Phase 1: Foundation
1. Initialize React + Vite app structure.
2. Move assets into `src/assets` (or `public/assets`) with consistent paths:
   - Logo: `assets/images/caryn harris logo.svg`
   - Resume: `assets/Caryn Harris 2026.pdf`
   - Fonts: `assets/*.woff` and `assets/*.woff2`
   - Sound: `assets/842609__ui-hater2012__menuclick.wav`
3. Port current font-face declarations to global stylesheet.
4. Build base layout and router.

### Phase 2: Page Porting
1. Rebuild current home layout as `HomePage` component.
2. Implement `AboutResumePage` using current style baseline.
3. Build `PortfolioPage` with structured project data.
4. Create `CreditsPage` with proper attribution for third-party assets.
5. Implement theme system with `useTheme` hook and `ThemeToggle` component.

### Phase 3: Polish
1. Accessibility pass.
2. Responsive QA pass.
3. SEO metadata pass.
4. Performance optimization pass.

## 10. Acceptance Criteria
1. App runs as SPA with client-side routing.
2. All primary pages render and are reachable via nav.
3. Existing brand logo and custom fonts load correctly.
4. Site is responsive across mobile/tablet/desktop.
5. No broken internal links or missing asset references.
6. Keyboard navigation works across nav and core interactions.
7. Lighthouse-style checks show no major accessibility issues.
8. Light/dark mode toggle works on all pages and persists across sessions.
9. Theme respects system preference on first visit.
10. Links scale smoothly on hover and play subtle click sound on interaction.
11. Sound effects can be disabled for accessibility.
12. Page transitions fade smoothly between routes without impacting performance.
13. Transitions respect `prefers-reduced-motion` setting.

## 11. Open Questions
1. Should the final style direction stay close to the current minimal centered layout or expand into section-based storytelling?
2. Is Bootstrap required, or should styling be custom CSS/CSS modules only?
3. Should resume be embedded on-page, downloadable, or both?
4. Which portfolio projects should be featured at launch?

### 11.2 Answers to Open Questions
1. The final style direction should stay minimal, using the centered layout for the Home page and a sidenav layout for the other pages. 
2. Bootstrap is not required; use default CSS when possible.
3. Resume should be both embedded onpage and downloadable (`assets/Caryn Harris 2026.pdf`). 
4. Portfolio should feature the [Clique App project](https://github.com/chatnchew/Clique-Capstone-Project), which is live at [cliqueapp.site](http://cliqueapp.site/).