import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-20px) translateX(10px) scale(1.1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) translateX(-15px) scale(0.9);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-30px) translateX(5px) scale(1.05);
    opacity: 0.5;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.2);
  }
`;

const StyledNebulaContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

const NebulaOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(100, 255, 218, 0.15) 0%,
    rgba(100, 255, 218, 0.05) 40%,
    transparent 70%
  );
  animation: ${float} ${props => props.duration}s infinite ease-in-out,
             ${pulse} ${props => props.pulseDuration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  filter: blur(1px);
`;

const ParticleOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  animation: ${float} ${props => props.duration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  box-shadow: 0 0 ${props => props.size}px rgba(255, 255, 255, 0.3);
`;

const NebulaGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(100, 255, 218, 0.03) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 70%, rgba(100, 255, 218, 0.02) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(255, 255, 255, 0.01) 0%, transparent 30%);
  animation: ${pulse} 8s infinite ease-in-out;
`;

const generateNebulas = (count) => {
  const nebulas = [];
  for (let i = 0; i < count; i++) {
    nebulas.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 200 + 100,
      duration: Math.random() * 20 + 15,
      pulseDuration: Math.random() * 10 + 8,
      delay: Math.random() * 10,
    });
  }
  return nebulas;
};

const generateParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
    });
  }
  return particles;
};

const Nebula = () => {
  const [nebulas, setNebulas] = useState([]);
  const [particles, setParticles] = useState([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Reduced version for accessibility
      setNebulas(generateNebulas(2).map(nebula => ({ ...nebula, duration: 0, pulseDuration: 0, delay: 0 })));
      setParticles([]);
      return;
    }

    setNebulas(generateNebulas(4));
    setParticles(generateParticles(15));
  }, [prefersReducedMotion]);

  return (
    <StyledNebulaContainer>
      <NebulaGradient />
      {nebulas.map(nebula => (
        <NebulaOrb
          key={nebula.id}
          left={nebula.left}
          top={nebula.top}
          size={nebula.size}
          duration={nebula.duration}
          pulseDuration={nebula.pulseDuration}
          delay={nebula.delay}
        />
      ))}
      {!prefersReducedMotion && particles.map(particle => (
        <ParticleOrb
          key={particle.id}
          left={particle.left}
          top={particle.top}
          size={particle.size}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
    </StyledNebulaContainer>
  );
};

export default Nebula; 