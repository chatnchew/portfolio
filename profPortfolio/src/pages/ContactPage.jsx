import siteContent from '../data/siteContent';
import useSound from '../hooks/useSound';
import './ContactPage.css';

const ContactPage = () => {
  const { playClickSound } = useSound();

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Get In Touch</h1>
        <p className="contact-intro">
          I'm always interested in hearing about new projects and opportunities. 
          Feel free to drop me a line!
        </p>

        <div className="contact-card">
          <div className="contact-item">
            <h2>Email</h2>
            <a 
              href={`mailto:${siteContent.contact.email}`}
              onClick={handleLinkClick}
            >
              {siteContent.contact.email}
            </a>
          </div>

          {siteContent.contact.social && (
            <div className="contact-item">
              <h2>Connect</h2>
              <div className="social-links">
                {siteContent.contact.social.github && (
                  <a 
                    href={siteContent.contact.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="social-link"
                  >
                    GitHub
                  </a>
                )}
                {siteContent.contact.social.linkedin && (
                  <a 
                    href={siteContent.contact.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="social-link"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
