import PropTypes from 'prop-types';
import useSound from '../../hooks/useSound';
import useTheme from '../../hooks/useTheme';
import './AccessibilityToggle.css';

const AccessibilityToggle = ({ className }) => {
  const { fontMode, toggleFontMode } = useTheme();
  const { playClickSound } = useSound();

  const isOpenDyslexic = fontMode === 'open-dyslexic';

  const handleToggle = () => {
    playClickSound();
    toggleFontMode();
  };

  return (
    <button
      className={`accessibility-toggle ${className || ''}`}
      onClick={handleToggle}
      aria-pressed={isOpenDyslexic}
      aria-label={`Switch font to ${isOpenDyslexic ? 'Far Out' : 'Open Dyslexic'}`}
      title={`Switch font to ${isOpenDyslexic ? 'Far Out' : 'Open Dyslexic'}`}
      type="button"
    >
      <span className="accessibility-toggle__label">Font</span>
      <span className="accessibility-toggle__value" aria-hidden="true">
        {isOpenDyslexic ? 'Open Dyslexic' : 'Far Out'}
      </span>
    </button>
  );
};

AccessibilityToggle.propTypes = {
  className: PropTypes.string,
};

AccessibilityToggle.defaultProps = {
  className: '',
};

export default AccessibilityToggle;