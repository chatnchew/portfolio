import { useState } from 'react';
import projects from '../data/projects';
import useSound from '../hooks/useSound';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const { playClickSound } = useSound();
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleLinkClick = () => {
    playClickSound();
  };

  const handleFilterClick = (category) => {
    playClickSound();
    setFilter(category);
  };

  return (
    <div className="portfolio-page">
      <div className="sidenav">
        <h2>Filter</h2>
        <ul>
          {categories.map(category => (
            <li key={category}>
              <button
                className={filter === category ? 'active' : ''}
                onClick={() => handleFilterClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content-area">
        <h1>Portfolio</h1>
        <p className="portfolio-intro">
          Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience.
        </p>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <article key={project.id} className="project-item">
              <div className="project-content">
                <h2>{project.title}</h2>
                <p className="project-role">{project.role}</p>
                <p className="project-summary">{project.summary}</p>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}
                <div className="project-stack">
                  {project.stack.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={handleLinkClick}
                    >
                      View Live →
                    </a>
                  )}
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={handleLinkClick}
                    >
                      View Code →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="no-projects">No projects found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
