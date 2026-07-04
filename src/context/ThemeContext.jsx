import { createContext, useContext, useEffect, useState } from 'react';
import { subscribeToSettings, updateSettings } from '@services/settingsService';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = subscribeToSettings((s) => {
      setSettings(s);
      setLoaded(true);
      // Apply accent color CSS variable
      if (s?.accentColor) {
        document.documentElement.style.setProperty('--accent', s.accentColor);
      }
    });
    return unsub;
  }, []);

  const saveSettings = async (data) => {
    await updateSettings(data);
  };

  return (
    <ThemeContext.Provider value={{ settings, loaded, saveSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
