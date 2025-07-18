import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaHome } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)`
  backdrop-filter: blur(10px);
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.cardBorder};
  padding: ${props => props.theme.space.md};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndex.sticky};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: bold;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const NavItem = styled(Link)`
  margin-left: ${props => props.theme.space.lg};
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.md};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const IconLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  margin-left: ${props => props.theme.space.md};
  font-size: ${props => props.theme.fontSizes.lg};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Header = () => (
  <HeaderContainer initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
    <Nav>
      <Logo to="/">
        <FaHome style={{ marginRight: '0.5rem' }} />
        Tiation Guide
      </Logo>
      <div>
        <NavItem to="/docs">Docs</NavItem>
        <NavItem to="/examples">Examples</NavItem>
        <NavItem to="/about">About</NavItem>
        <IconLink href="https://github.com/tiation/tiation-macos-networking-guide" target="_blank">
          <FaGithub />
        </IconLink>
      </div>
    </Nav>
  </HeaderContainer>
);

export default Header;

