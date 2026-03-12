import NavMenu from './NavMenu';
import AccessibilityToggle from './AccessibilityToggle';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <NavMenu />
        <div className="header-controls">
          <AccessibilityToggle className="header-accessibility-toggle" />
          <ThemeToggle className="header-theme-toggle" />
        </div>
      </div>
    </header>
  );
};

export default Header;
