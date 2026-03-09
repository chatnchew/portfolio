import './CreditsPage.css';

const CreditsPage = () => {
  return (
    <div className="credits-page">
      <div className="credits-container">
        <h1>Credits & Attributions</h1>
        <p className="credits-intro">
          This website uses various third-party assets. Thank you to all the creators!
        </p>

        <section className="credits-section">
          <h2>Sound Effects</h2>
          <div className="credit-item">
            <h3>menuClick</h3>
            <p><strong>Creator:</strong> ui-hater2012</p>
            <p>
              <strong>Source:</strong>{' '}
              <a 
                href="https://freesound.org/s/842609/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                https://freesound.org/s/842609/
              </a>
            </p>
            <p><strong>License:</strong> Attribution 4.0</p>
          </div>
        </section>

        <section className="credits-section">
          <h2>Fonts</h2>
          <div className="credit-item">
            <h3>Disclaimer Plain & Far Out</h3>
            <p>Custom webfonts used for headers and navigation</p>
            <p>Generated via Font Squirrel Webfont Generator</p>
          </div>
        </section>

        <section className="credits-section">
          <h2>Technology</h2>
          <div className="credit-item">
            <p>Built with React, Vite, and React Router</p>
            <p>Hosted and deployed with modern web technologies</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreditsPage;
