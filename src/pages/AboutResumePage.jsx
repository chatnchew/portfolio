import siteContent from '../data/siteContent';
import useSound from '../hooks/useSound';
import { useTheme } from '../contexts/ThemeContext';
import carynPortrait from '../assets/images/caryn portrait.PNG';
import carynPortraitDark from '../assets/images/caryn portrait darkmode.PNG';
import './AboutResumePage.css';

const AboutResumePage = () => {
  const { playClickSound } = useSound();
  const { theme } = useTheme();

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <div className="about-page">
      <div className="sidenav">
        <h2>Navigation</h2>
        <ul>
          <li><a href="#bio" onClick={handleLinkClick}>Biography</a></li>
          <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
          <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
          <li><a href="#education" onClick={handleLinkClick}>Education</a></li>
          <li><a href="#resume" onClick={handleLinkClick}>Resume</a></li>
        </ul>
      </div>

      <div className="main-content-area">
        <h1>About & Resume</h1>

        <section id="bio" className="content-section">
          <h2>Biography</h2>
          <div className="bio-content">
            <img 
              src={theme === 'light' ? carynPortrait : carynPortraitDark}
              alt="Caryn Harris Portrait"
              className="portrait-image"
            />
            <div className="bio-text">
              {siteContent.about.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="content-section">
          <h2>Skills</h2>
          <ul className="skills-list">
            {siteContent.about.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section id="experience" className="content-section">
          <h2>Experience</h2>
          {siteContent.about.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.title}</h3>
              <p className="company">{exp.company} | {exp.period}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        <section id="education" className="content-section">
          <h2>Education</h2>
          {siteContent.about.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <p>{edu.institution} | {edu.year}</p>
            </div>
          ))}
        </section>

        <section id="resume" className="content-section">
          <h2>Resume</h2>
          <p>Download my complete resume in PDF format:</p>
          <a 
            href={siteContent.about.resumeUrl} 
            className="download-button"
            download
            onClick={handleLinkClick}
          >
            Download Resume (PDF)
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutResumePage;
