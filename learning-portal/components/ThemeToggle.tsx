
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <label
      className="swap swap-rotate flex items-center justify-center gap-2"
      style={{
        backgroundColor: 'rgba(0,0,0,0.01)',
        padding: '10px 12px',
        borderRadius: '8px',
        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
    >
      {/* hidden checkbox controls the state */}
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} className="hidden" />

      {/* Sun Icon and Light Mode Text */}
      <div className="swap-on flex items-center gap-2">
        <FaSun className="h-5 w-5 text-yellow-500" />
        <span className="text-sm font-medium">Light</span>
      </div>

      {/* Moon Icon and Dark Mode Text */}
      <div className="swap-off flex items-center gap-2">
        <FaMoon className="h-5 w-5 text-dark-500" />
        <span className="text-sm font-medium">Dark</span>
      </div>
    </label>
  );
}
