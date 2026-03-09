import { useRef, useState, useEffect } from 'react';
import menuClickSound from '../assets/sounds/842609__ui-hater2012__menuclick.wav';

const useSound = () => {
  const audioRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio(menuClickSound);
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('soundEnabled', soundEnabled);
  }, [soundEnabled]);

  const playClickSound = () => {
    if (soundEnabled && audioRef.current) {
      // Reset audio to start
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.warn('Audio play failed:', err);
      });
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return { playClickSound, soundEnabled, toggleSound };
};

export default useSound;
