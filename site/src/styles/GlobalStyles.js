import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&family=Fira+Code:wght@300;400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    transition: all ${props => props.theme.transitions.fast};
  }

  code {
    font-family: ${props => props.theme.fonts.mono};
    background: ${props => props.theme.colors.card};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.9em;
  }

  pre {
    font-family: ${props => props.theme.fonts.mono};
    background: ${props => props.theme.colors.card};
    padding: ${props => props.theme.space.md};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    border: 1px solid ${props => props.theme.colors.cardBorder};
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.space.md};
    margin: ${props => props.theme.space.md} 0;
    color: ${props => props.theme.colors.textSecondary};
    font-style: italic;
  }

  hr {
    border: none;
    height: 1px;
    background: ${props => props.theme.colors.cardBorder};
    margin: ${props => props.theme.space.xl} 0;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.cardBorder};
    border-radius: ${props => props.theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primary};
  }

  /* Selection styling */
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }

  ::-moz-selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }

  /* Focus outline */
  :focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Responsive typography */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    body {
      font-size: 0.9rem;
    }
  }

  /* Animation classes */
  .fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }

  .slideUp {
    animation: slideUp 0.5s ease-out;
  }

  .glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 20px ${props => props.theme.colors.primary};
    }
    to {
      box-shadow: 0 0 30px ${props => props.theme.colors.primary}, 0 0 40px ${props => props.theme.colors.primary};
    }
  }

  /* Utility classes */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .d-none {
    display: none;
  }

  .d-block {
    display: block;
  }

  .d-flex {
    display: flex;
  }

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .w-full {
    width: 100%;
  }

  .h-full {
    height: 100%;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .fixed {
    position: fixed;
  }

  .sticky {
    position: sticky;
  }

  .z-10 {
    z-index: 10;
  }

  .z-20 {
    z-index: 20;
  }

  .z-30 {
    z-index: 30;
  }
`;

export default GlobalStyles;
