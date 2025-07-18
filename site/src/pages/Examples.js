import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ExamplesContainer = styled.section`
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

const ExampleCard = styled.div`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.cardBorder};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.space.xl};
  margin-bottom: ${props => props.theme.space.xl};
`;

const ExampleTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.space.md};
`;

const ExampleDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.space.lg};
  line-height: 1.6;
`;

const Examples = () => {
  const examples = [
    {
      id: 1,
      title: "IPv6 Network Analysis",
      description: "Analyze your current IPv6 configuration and connectivity.",
      code: `# Check current IPv6 interfaces
ifconfig | grep -A 5 -B 5 inet6

# Check IPv6 routing table
netstat -rn -f inet6

# Test IPv6 connectivity
ping6 -c 3 2001:4860:4860::8888`
    },
    {
      id: 2,
      title: "Hurricane Electric Tunnel Setup",
      description: "Configure an IPv6 tunnel using Hurricane Electric's tunnel broker.",
      code: `# Create tunnel interface
sudo ifconfig gif0 create

# Configure tunnel endpoints
sudo ifconfig gif0 tunnel YOUR_IPV4 HE_SERVER_IPV4

# Set IPv6 addresses
sudo ifconfig gif0 inet6 CLIENT_IPV6 SERVER_IPV6 prefixlen 128

# Add default route
sudo route -n add -inet6 default SERVER_IPV6`
    },
    {
      id: 3,
      title: "Wi-Fi Network Scanning",
      description: "Scan for available Wi-Fi networks and printers.",
      code: `# Install airport command
sudo ln -sf /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport

# Scan for networks
airport -s

# Detailed network information
system_profiler SPAirPortDataType`
    }
  ];

  return (
    <ExamplesContainer>
      <Title>Code Examples</Title>
      {examples.map(example => (
        <ExampleCard key={example.id}>
          <ExampleTitle>{example.title}</ExampleTitle>
          <ExampleDescription>{example.description}</ExampleDescription>
          <SyntaxHighlighter 
            language="bash" 
            style={atomDark}
            customStyle={{
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            {example.code}
          </SyntaxHighlighter>
        </ExampleCard>
      ))}
    </ExamplesContainer>
  );
};

export default Examples;
