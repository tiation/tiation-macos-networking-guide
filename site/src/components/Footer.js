import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: ${props => props.theme.space.md};
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.cardBorder};
  text-align: center;
  position: relative;
  z-index: ${props => props.theme.zIndex.fixed};
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.fontSizes.sm};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>
      © {new Date().getFullYear()} Tiation - Built with ❤️ by <a href="https://github.com/tiation">Tiation</a>
    </FooterText>
  </FooterContainer>
);

export default Footer;

