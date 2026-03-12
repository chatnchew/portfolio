import siteContent from '../data/siteContent';
import logo from '../assets/images/caryn harris logo.png';
import logoDark from '../assets/images/caryn harris logo darkmode.png';
import useTheme from '../hooks/useTheme';
import './HomePage.css';

const HomePage = () => {
  const { theme } = useTheme();

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
