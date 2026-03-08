import { Link } from 'react-router-dom';
import siteContent from '../data/siteContent';
import projects from '../data/projects';
import logo from '../assets/images/caryn harris logo.png';
import useSound from '../hooks/useSound';
import './HomePage.css';

const HomePage = () => {
  const { playClickSound } = useSound();
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
              src={logo} 
              alt="Caryn Harris Logo" 
              className="logo"
            />
            <h1 className="hero-title">{siteContent.hero.title}</h1>
            <p className="hero-subtitle">{siteContent.hero.subtitle}</p>
            <p className="hero-intro">{siteContent.hero.intro}</p>
          </div>

          {featuredProjects.length > 0 && (
            <section className="featured-projects">
              <h2>Featured Work</h2>
              <div className="project-cards">
                {featuredProjects.map(project => (
                  <div key={project.id} className="project-card">
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="project-links">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          View Live
                        </a>
                      )}
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/portfolio" className="view-all-link" onClick={handleLinkClick}>
                View All Projects →
              </Link>
            </section>
          )}

          <section className="cta-section">
            <Link to="/about" className="cta-button" onClick={handleLinkClick}>
              Learn More About Me
            </Link>
            <Link to="/contact" className="cta-button secondary" onClick={handleLinkClick}>
              Get In Touch
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
