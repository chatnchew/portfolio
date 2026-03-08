# React SPA Development Guidelines

## Project Overview
This is a **React Single Page Application (SPA)** for a professional portfolio website.

### Tech Stack
- **Framework**: React 18+
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Context API / Redux (specify if applicable)
- **Styling**: Bootstrap
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint with React plugins
- **Formatting**: Prettier

## Start Here

### Key Principles for This Project
1. **Component-First Architecture**: Build reusable, modular components
2. **Performance**: Optimize for fast initial load and smooth navigation
3. **Accessibility**: Follow WCAG 2.1 AA standards
4. **Mobile-First**: Design and implement mobile-first, responsive layouts
5. **SEO-Friendly**: Implement proper meta tags, semantic HTML, and consider SSR/SSG if needed

### Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── common/       # Shared components (Button, Input, etc.)
│   └── layout/       # Layout components (Header, Footer, etc.)
├── pages/            # Page-level components
├── hooks/            # Custom React hooks
├── context/          # React Context providers
├── utils/            # Helper functions
├── services/         # API calls and external services
├── assets/           # Images, fonts, static files
├── styles/           # Global styles and theme
└── App.jsx           # Main app component
```

## Dev Environment Tips

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Workflow
- Use **React DevTools** browser extension for debugging
- Enable **Fast Refresh** for instant feedback during development
- Use **ESLint** and **Prettier** editor integrations for real-time feedback
- Check browser console for warnings and errors regularly

### Environment Variables
- Store configuration in `.env` files
- Prefix with `VITE_` for Vite
- Never commit `.env.local` or `.env.production.local`

## Code Standards

### React Component Guidelines

#### Component Structure
```jsx
// 1. Imports (external, then internal)
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import styles from './MyComponent.module.css';

// 2. Component definition (prefer functional components)
const MyComponent = ({ title, onAction }) => {
  // 3. Hooks (useState, useEffect, custom hooks)
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // 4. Event handlers
  const handleClick = () => {
    setIsActive(!isActive);
    onAction?.();
  };

  // 5. useEffect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 6. Render helpers (optional)
  const renderContent = () => {
    // Complex rendering logic
  };

  // 7. Return JSX
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Toggle</Button>
    </div>
  );
};

// 8. PropTypes
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
};

// 9. Default props (if needed)
MyComponent.defaultProps = {
  onAction: null,
};

// 10. Export
export default MyComponent;
```

#### Naming Conventions
- **Components**: PascalCase (`UserProfile.jsx`, `NavigationBar.jsx`)
- **Files**: Match component name (`UserProfile.jsx` for `UserProfile` component)
- **Hooks**: camelCase with `use` prefix (`useAuth`, `useFetch`)
- **Event Handlers**: `handle` prefix (`handleSubmit`, `handleChange`)
- **Boolean Props**: `is`, `has`, `should` prefix (`isOpen`, `hasError`, `shouldShow`)
- **CSS Modules**: camelCase for classes in JS, kebab-case in CSS

#### Best Practices
- **Keep components small**: Single responsibility principle
- **Use functional components**: Prefer hooks over class components
- **Avoid prop drilling**: Use Context API or state management for deeply nested props
- **Memoization**: Use `React.memo`, `useMemo`, `useCallback` for optimization
- **Key prop**: Always provide stable keys in lists (avoid index as key)
- **Fragments**: Use `<>` to avoid extra DOM nodes
- **Conditional rendering**: Use ternary or `&&` operator, avoid `if` statements in JSX
- **Destructure props**: Destructure in function parameters for clarity
- **File count**: Use a minimal amount of total files for the entire project

### JavaScript/TypeScript Standards
- Use **ES6+ syntax**: arrow functions, destructuring, spread operator, template literals
- **Avoid `var`**: Use `const` by default, `let` when reassignment is needed
- **Async/Await**: Prefer async/await over promise chains
- **Optional chaining**: Use `?.` for safe property access
- **Nullish coalescing**: Use `??` instead of `||` when appropriate

### CSS/Styling Standards
- Use **CSS Modules** or **CSS-in-JS** to avoid global namespace pollution
- Follow **BEM naming** if using plain CSS
- **Mobile-first**: Write base styles for mobile, use `min-width` media queries
- **Design tokens**: Use CSS variables for colors, spacing, typography
- **Avoid inline styles**: Prefer className-based styling for maintainability

### Accessibility
- Use **semantic HTML**: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- **ARIA labels**: Add aria-label or aria-labelledby when needed
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Focus management**: Manage focus for modals, route changes
- **Alt text**: Always provide meaningful alt text for images
- **Color contrast**: Ensure WCAG AA compliance (4.5:1 for text)

### Performance
- **Code splitting**: Use `React.lazy()` and `Suspense` for route-based splitting
- **Image optimization**: Use lazy loading, responsive images
- **Bundle size**: Keep bundle size small, analyze with `vite-bundle-visualizer`
- **Memoization**: Memoize expensive computations and callbacks
- **Virtualization**: Use libraries like `react-window` for long lists

## Testing Instructions

### Testing Philosophy
- **Test behavior, not implementation**: Focus on what users see and do
- **Write tests as you code**: Don't leave testing for the end
- **Coverage goals**: Aim for >80% coverage on critical paths

### Testing Patterns
```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders the title', () => {
    render(<MyComponent title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('calls onAction when button is clicked', async () => {
    const mockAction = jest.fn();
    render(<MyComponent title="Test" onAction={mockAction} />);
    
    const button = screen.getByRole('button', { name: /toggle/i });
    await userEvent.click(button);
    
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('handles async operations', async () => {
    render(<MyComponent title="Async Test" />);
    
    await waitFor(() => {
      expect(screen.getByText('Loaded')).toBeInTheDocument();
    });
  });
});
```

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test MyComponent.test.jsx
```

### What to Test
- **Component rendering**: Does it render correctly with props?
- **User interactions**: Click, type, submit, etc.
- **Conditional rendering**: Different states and conditions
- **Edge cases**: Empty states, error states, loading states
- **Accessibility**: Screen reader support, keyboard navigation
- **Integration**: Components working together, routing

### What NOT to Test
- **Third-party libraries**: Assume they work correctly
- **Implementation details**: Internal state, private functions
- **Styling**: Visual regression testing is separate concern

## PR Instructions

### Before Committing
```bash
# Lint code
npm run lint

# Fix auto-fixable lint issues
npm run lint -- --fix

# Format code
npm run format

# Run tests
npm test

# Build to verify no build errors
npm run build
```

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:
- `feat(navigation): add mobile hamburger menu`
- `fix(home): resolve hero image loading issue`
- `refactor(components): extract Button to common components`
- `test(auth): add tests for login flow`

### Pull Request Checklist
- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] No new warnings or errors
- [ ] Tests added/updated and passing
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility checked (keyboard nav, screen reader)
- [ ] Browser compatibility verified (Chrome, Firefox, Safari, Edge)
- [ ] Performance impact considered

### PR Title Format
`[Portfolio] <Type>: <Brief Description>`

**Examples**:
- `[Portfolio] feat: Add contact form with validation`
- `[Portfolio] fix: Resolve navigation menu z-index issue`
- `[Portfolio] refactor: Migrate to React Router v6`

## Common Tasks

### Creating a New Component
```bash
# Create component folder
mkdir -p src/components/ComponentName

# Create files
touch src/components/ComponentName/ComponentName.jsx
touch src/components/ComponentName/ComponentName.module.css
touch src/components/ComponentName/ComponentName.test.jsx
touch src/components/ComponentName/index.js  # for clean imports
```

### Adding a New Page
1. Create page component in `src/pages/`
2. Add route in `App.jsx` or `router.jsx`
3. Update navigation links
4. Add meta tags for SEO
5. Test navigation and back button

### Optimizing Performance
1. Use React DevTools Profiler to identify slow components
2. Implement code splitting for routes
3. Memoize expensive computations
4. Optimize images (lazy loading)
5. Reduce bundle size (tree shaking, dynamic imports)

### Debugging Tips
- Use React DevTools to inspect component tree and props
- Use browser DevTools Network tab to check API calls
- Check console for warnings (key prop, deprecated APIs)
- Use `debugger` statement or breakpoints effectively
- Monitor bundle size with build analyzer

## Additional Resources
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Testing Library](https://testing-library.com/react)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Bootstrap Documentation](https://twbs-bootstrap.netlify.app/docs/5.3/getting-started/introduction/)