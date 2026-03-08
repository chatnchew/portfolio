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
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>
            About & Resume
          </Link>
        </li>
        <li>
          <Link to="/portfolio" onClick={handleLinkClick}>
            Portfolio
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
