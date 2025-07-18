import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

// Pages
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Examples from './pages/Examples';
import About from './pages/About';

// Styles
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

const AppContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router basename="/tiation-macos-networking-guide">
        <AppContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ParticleBackground />
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
