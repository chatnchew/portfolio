import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import useSound from '../../hooks/useSound';
import './ThemeToggle.css';

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const { playClickSound } = useSound();

  const handleToggle = () => {
    playClickSound();
    toggleTheme();
  };

  return (
    <button
      className={`theme-toggle ${className || ''}`}
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string,
};

ThemeToggle.defaultProps = {
  className: '',
};

export default ThemeToggle;
