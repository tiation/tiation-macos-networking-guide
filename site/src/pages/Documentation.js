import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBook, FaCode, FaWifi, FaPrint } from 'react-icons/fa';

const DocsContainer = styled.section`
  padding: ${props => props.theme.space['2xl']} ${props => props.theme.space.md};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.space['2xl']};
`;

const DocGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.space.xl};
  margin-top: ${props => props.theme.space['2xl']};
`;

const DocCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.cardBorder};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.space.xl};
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.neon};
  }
`;

const DocIcon = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.space.md};
`;

const DocTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.space.sm};
`;

const DocDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const Documentation = () => {
  const docs = [
    {
      id: 1,
      icon: <FaBook />,
      title: "Getting Started",
      description: "Learn the basics of setting up your networking environment with our comprehensive guide."
    },
    {
      id: 2,
      icon: <FaCode />,
      title: "IPv6 Tunneling",
      description: "Configure Hurricane Electric IPv6 tunnels for enterprise-grade connectivity."
    },
    {
      id: 3,
      icon: <FaWifi />,
      title: "Wi-Fi Scanning",
      description: "Master Wi-Fi network analysis and scanning with airport command utilities."
    },
    {
      id: 4,
      icon: <FaPrint />,
      title: "Offline Printing",
      description: "Connect to printers without internet using Wi-Fi Direct and other methods."
    }
  ];

  return (
    <DocsContainer>
      <Title>Documentation</Title>
      <DocGrid>
        {docs.map(doc => (
          <DocCard
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: doc.id * 0.1 }}
          >
            <DocIcon>{doc.icon}</DocIcon>
            <DocTitle>{doc.title}</DocTitle>
            <DocDescription>{doc.description}</DocDescription>
          </DocCard>
        ))}
      </DocGrid>
    </DocsContainer>
  );
};

export default Documentation;
