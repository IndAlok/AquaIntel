// hooks/useThemeMode.js
// Custom hook for theme management

import { useContext } from 'react';
import { ThemeContext } from '../store/ThemeContext';

/**
 * Custom hook to access theme context
 * @returns {Object} Theme context with theme, isDark, toggleTheme, setThemeMode
 */
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  
  return context;
};

export default useThemeMode;
