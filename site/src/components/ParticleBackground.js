import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const glow = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
`;

const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite,
             ${glow} ${props => props.glowDuration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.color};
  left: ${props => props.x}%;
  top: ${props => props.y}%;
`;

const GridLine = styled.div`
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  
  &.horizontal {
    width: 100%;
    height: 1px;
    top: ${props => props.position}%;
  }
  
  &.vertical {
    width: 1px;
    height: 100%;
    left: ${props => props.position}%;
  }
`;

const ParticleBackground = () => {
  const particles = [];
  const gridLines = [];
  
  // Generate particles
  for (let i = 0; i < 50; i++) {
    const colors = ['#00ffff', '#ff00ff', '#ffff00'];
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 3 + 2,
      glowDuration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    });
  }
  
  // Generate grid lines
  for (let i = 0; i < 10; i++) {
    gridLines.push({
      id: `h-${i}`,
      type: 'horizontal',
      position: i * 10,
    });
    gridLines.push({
      id: `v-${i}`,
      type: 'vertical',
      position: i * 10,
    });
  }

  return (
    <ParticleContainer>
      {gridLines.map(line => (
        <GridLine
          key={line.id}
          className={line.type}
          position={line.position}
        />
      ))}
      
      {particles.map(particle => (
        <Particle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          size={particle.size}
          color={particle.color}
          duration={particle.duration}
          glowDuration={particle.glowDuration}
          delay={particle.delay}
        />
      ))}
    </ParticleContainer>
  );
};

export default ParticleBackground;
