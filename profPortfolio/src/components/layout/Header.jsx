import NavMenu from './NavMenu';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <NavMenu />
        <ThemeToggle className="header-theme-toggle" />
      </div>
    </header>
  );
};

export default Header;
