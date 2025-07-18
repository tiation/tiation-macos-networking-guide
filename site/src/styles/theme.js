const theme = {
  colors: {
    background: '#0a0a0a',
    backgroundGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    textMuted: '#666666',
    success: '#00ff00',
    warning: '#ff8800',
    error: '#ff0000',
    card: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(0, 255, 255, 0.3)',
    input: 'rgba(255, 255, 255, 0.1)',
    inputBorder: 'rgba(0, 255, 255, 0.5)',
    button: 'linear-gradient(45deg, #00ffff, #0080ff)',
    buttonHover: 'linear-gradient(45deg, #0080ff, #00ffff)',
    shadow: 'rgba(0, 255, 255, 0.2)',
    glowCyan: '0 0 20px rgba(0, 255, 255, 0.5)',
    glowMagenta: '0 0 20px rgba(255, 0, 255, 0.5)',
    glowYellow: '0 0 20px rgba(255, 255, 0, 0.5)',
  },
  
  gradients: {
    neon: 'linear-gradient(45deg, #00ffff, #ff00ff)',
    neonReverse: 'linear-gradient(45deg, #ff00ff, #00ffff)',
    cyberpunk: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #ffff00 100%)',
    dark: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
    darkCard: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  },
  
  fonts: {
    primary: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    mono: "'Fira Code', 'Monaco', 'Consolas', monospace",
    heading: "'Orbitron', 'Inter', sans-serif",
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 255, 255, 0.1)',
    md: '0 4px 6px rgba(0, 255, 255, 0.1)',
    lg: '0 10px 15px rgba(0, 255, 255, 0.1)',
    xl: '0 20px 25px rgba(0, 255, 255, 0.1)',
    neon: '0 0 20px rgba(0, 255, 255, 0.5)',
    neonLarge: '0 0 40px rgba(0, 255, 255, 0.3)',
    inner: 'inset 0 2px 4px rgba(0, 255, 255, 0.1)',
  },
  
  transitions: {
    fast: '0.15s ease-out',
    normal: '0.3s ease-out',
    slow: '0.5s ease-out',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

export default theme;
