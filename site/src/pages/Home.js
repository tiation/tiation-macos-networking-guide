import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.section`
  padding: ${props => props.theme.space['4xl']} ${props => props.theme.space.md};
  text-align: center;
`;

const Heading = styled.h1`
  font-size: ${props => props.theme.fontSizes['5xl']};
  color: ${props => props.theme.colors.primary};
`;

const Subheading = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.secondary};
  margin-top: ${props => props.theme.space.md};
`;

const Paragraph = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.space.lg};
  line-height: 1.6;
`;

const Home = () => (
  <HomeContainer>
    <Heading>Welcome to Tiation macOS Networking Guide</Heading>
    <Subheading>Your Ultimate Resource for Enterprise-Grade Networking</Subheading>
    <Paragraph>
      Discover powerful tools and guides for IPv6 tunneling, Wi-Fi scanning,
      and offline printer connectivity, all designed for macOS.
    </Paragraph>
  </HomeContainer>
);

export default Home;

