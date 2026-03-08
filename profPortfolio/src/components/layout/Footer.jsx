import { Link } from 'react-router-dom';
import useSound from '../../hooks/useSound';
import './Footer.css';

const Footer = () => {
  const { playClickSound, soundEnabled, toggleSound } = useSound();

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Caryn Harris. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/credits" onClick={handleLinkClick}>
            Credits
          </Link>
          <button 
            className="sound-toggle"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
            title={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
