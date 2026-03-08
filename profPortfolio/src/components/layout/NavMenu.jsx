import { Link } from 'react-router-dom';
import useSound from '../../hooks/useSound';
import './NavMenu.css';

const NavMenu = () => {
  const { playClickSound } = useSound();

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <nav className="nav-menu" aria-label="Main navigation">
      <ul>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>
            about & resume
          </Link>
        </li>
        <li>
          <Link to="/portfolio" onClick={handleLinkClick}>
            portfolio
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleLinkClick}>
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
