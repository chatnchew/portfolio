import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './themeContextObject';

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [fontMode, setFontMode] = useState(() => {
    const savedFontMode = localStorage.getItem('fontMode');
    return savedFontMode === 'open-dyslexic' ? 'open-dyslexic' : 'far-out';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-mode', fontMode);
    localStorage.setItem('fontMode', fontMode);
  }, [fontMode]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleFontMode = () => {
    setFontMode(prevFontMode => prevFontMode === 'far-out' ? 'open-dyslexic' : 'far-out');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontMode, toggleFontMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
