import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const shootingStar = keyframes`
  0% {
    transform: translateX(-100px) translateY(100px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 100px)) translateY(-100px);
    opacity: 0;
  }
`;

const floatingStars = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const StyledStarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 3;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${twinkle} ${props => props.duration}s infinite linear,
             ${floatingStars} ${props => props.floatDuration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  box-shadow: 0 0 ${props => props.size * 2}px rgba(255, 255, 255, 0.8);

  &.bright {
    background: var(--green);
    box-shadow: 0 0 ${props => props.size * 3}px var(--green);
  }
`;

const ShootingStar = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, transparent, #fff, transparent);
  border-radius: 50%;
  top: ${props => props.top}%;
  animation: ${shootingStar} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
    transform: translateX(-50px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--green), transparent);
    transform: translateX(-30px);
    opacity: 0.6;
  }
`;

const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const isBright = Math.random() < 0.1; // 10% chance for bright green stars
    stars.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      floatDuration: Math.random() * 4 + 6,
      delay: Math.random() * 5,
      bright: isBright,
    });
  }
  return stars;
};

const generateShootingStars = (count) => {
  const shootingStars = [];
  for (let i = 0; i < count; i++) {
    shootingStars.push({
      id: i,
      top: Math.random() * 60 + 10, // Keep in upper portion
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 10 + i * 3, // Spread them out
    });
  }
  return shootingStars;
};

const Stars = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Generate static stars without animation for accessibility
      setStars(generateStars(50).map(star => ({ ...star, duration: 0, delay: 0 })));
      return;
    }

    setStars(generateStars(100));
    setShootingStars(generateShootingStars(3));
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <StyledStarsContainer>
        {stars.map(star => (
          <Star
            key={star.id}
            left={star.left}
            top={star.top}
            size={star.size}
            duration={0}
            floatDuration={0}
            delay={0}
            className={star.bright ? 'bright' : ''}
            style={{ opacity: 0.6 }}
          />
        ))}
      </StyledStarsContainer>
    );
  }

  return (
    <StyledStarsContainer>
      {stars.map(star => (
        <Star
          key={star.id}
          left={star.left}
          top={star.top}
          size={star.size}
          duration={star.duration}
          floatDuration={star.floatDuration}
          delay={star.delay}
          className={star.bright ? 'bright' : ''}
        />
      ))}
      {shootingStars.map(shootingStar => (
        <ShootingStar
          key={shootingStar.id}
          top={shootingStar.top}
          duration={shootingStar.duration}
          delay={shootingStar.delay}
        />
      ))}
    </StyledStarsContainer>
  );
};

export default Stars; 