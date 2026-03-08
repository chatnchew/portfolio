import { Link } from 'react-router-dom';
import siteContent from '../data/siteContent';
import projects from '../data/projects';
import logo from '../assets/images/caryn harris logo.png';
import logoDark from '../assets/images/caryn harris logo darkmode.png';
import useSound from '../hooks/useSound';
import { useTheme } from '../contexts/ThemeContext';
import './HomePage.css';

const HomePage = () => {
  const { playClickSound } = useSound();
  const { theme } = useTheme();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <div className="home-page">
      <div className="page-wrapper">
        <div className="page-content">
          <div className="hero-section">
            <img 
              src={theme === 'dark' ? logoDark : logo} 
              alt="Caryn Harris Logo" 
              className="logo"
            />
            <p className="hero-subtitle">{siteContent.hero.subtitle}</p>
            <p className="hero-intro">{siteContent.hero.intro}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
