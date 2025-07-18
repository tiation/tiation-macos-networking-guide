import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaHeart, FaTerminal } from 'react-icons/fa';

const AboutContainer = styled.section`
  padding: ${props => props.theme.space['2xl']} ${props => props.theme.space.md};
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.space['2xl']};
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.space['2xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.space.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
`;

const Paragraph = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.space.md};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.space.sm} 0;
  
  &::before {
    content: "▶ ";
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  padding: ${props => props.theme.space.md} ${props => props.theme.space.lg};
  background: ${props => props.theme.colors.button};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.buttonHover};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.neon};
  }
`;

const About = () => (
  <AboutContainer>
    <Title>About Tiation macOS Networking Guide</Title>
    
    <Section>
      <SectionTitle>
        <FaTerminal />
        What is this project?
      </SectionTitle>
      <Paragraph>
        The Tiation macOS Networking Guide is an enterprise-grade collection of tools, scripts, and documentation 
        designed to help macOS users configure advanced networking features. Whether you're setting up IPv6 tunnels, 
        scanning Wi-Fi networks, or connecting to printers offline, this guide has you covered.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>
        <FaHeart />
        Key Features
      </SectionTitle>
      <FeatureList>
        <FeatureItem>Hurricane Electric IPv6 tunnel configuration</FeatureItem>
        <FeatureItem>Automated Wi-Fi network scanning and analysis</FeatureItem>
        <FeatureItem>Offline printer connectivity solutions</FeatureItem>
        <FeatureItem>Enterprise-grade security and monitoring</FeatureItem>
        <FeatureItem>Dark neon theme with cyan gradient design</FeatureItem>
        <FeatureItem>Comprehensive documentation and examples</FeatureItem>
      </FeatureList>
    </Section>

    <Section>
      <SectionTitle>
        <FaGithub />
        Open Source
      </SectionTitle>
      <Paragraph>
        This project is open source and available under the MIT License. We welcome contributions 
        from the community and encourage you to get involved!
      </Paragraph>
      <LinkButton href="https://github.com/tiation/tiation-macos-networking-guide" target="_blank">
        <FaGithub />
        View on GitHub
      </LinkButton>
    </Section>
  </AboutContainer>
);

export default About;
