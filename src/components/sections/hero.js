import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Stars from '../stars';
import Nebula from '../nebula';

const StyledHeroWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
`;

const StyledHeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--navy) 0%, var(--dark-navy) 100%);
  z-index: 1;
`;

const StyledHeroContent = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0 150px;
  position: relative;
  z-index: 10;

  @media (max-width: 1080px) {
    padding: 0 100px;
  }
  @media (max-width: 768px) {
    padding: 0 50px;
  }
  @media (max-width: 480px) {
    padding: 0 25px;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  /* Content positioning */
  .hero-inner {
    position: relative;
    z-index: 10;
    width: 100%;
    margin-top: 100px;
    
    @media (max-width: 768px) {
      margin-top: 80px;
    }

    @media (max-width: 480px) {
      margin-top: 60px;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    text-shadow: 
      0 0 10px rgba(100, 255, 218, 0.8),
      0 0 20px rgba(100, 255, 218, 0.4),
      2px 2px 4px rgba(0, 0, 0, 0.8);

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2.big-heading {
    text-shadow: 
      0 0 20px rgba(255, 255, 255, 0.3),
      0 0 40px rgba(255, 255, 255, 0.1),
      2px 2px 8px rgba(0, 0, 0, 0.8);
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    text-shadow: 
      0 0 15px rgba(255, 255, 255, 0.2),
      2px 2px 6px rgba(0, 0, 0, 0.8);
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    color: var(--light-slate);
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.1),
      1px 1px 3px rgba(0, 0, 0, 0.8);
    background: rgba(10, 25, 47, 0.3);
    padding: 15px;
    border-radius: 8px;
    backdrop-filter: blur(5px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    position: relative;
    background: rgba(100, 255, 218, 0.1);
    border: 2px solid var(--green);
    backdrop-filter: blur(10px);
    box-shadow: 
      0 0 20px rgba(100, 255, 218, 0.4),
      0 4px 15px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
    text-shadow: 0 0 8px rgba(100, 255, 218, 0.8);

    &:hover {
      background: rgba(100, 255, 218, 0.2);
      box-shadow: 
        0 0 30px rgba(100, 255, 218, 0.6),
        0 6px 20px rgba(0, 0, 0, 0.5);
      transform: translateY(-3px);
    }
  }

  /* Ambient background glow */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 40%, rgba(100, 255, 218, 0.02) 0%, transparent 60%),
                radial-gradient(circle at 70% 80%, rgba(100, 255, 218, 0.01) 0%, transparent 60%);
    z-index: 0;
    pointer-events: none;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Suman Shah.</h2>;
  const three = <h3 className="big-heading">I build scalable solutions and automate complex systems.</h3>;
  const four = (
    <>
      <p>
        I'm a Systems Engineer & Web Developer at{' '}
        <a href="https://foresight-analytics.com" target="_blank" rel="noreferrer">
          Foresight Analytics
        </a>
        , specializing in Python automation, cloud infrastructure, and full-stack development. I enjoy creating efficient solutions that solve real-world problems while pursuing my Bachelor's degree at{' '}
        <a href="https://cihe.edu.au/" target="_blank" rel="noreferrer">
          Crown Institute
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="/#contact">
      Contact me
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroWrapper>
      <StyledHeroBackground>
        <Nebula />
        <Stars />
      </StyledHeroBackground>
      <StyledHeroContent>
        <div className="hero-inner">
          {prefersReducedMotion ? (
            <>
              {items.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </>
          ) : (
            <TransitionGroup component={null}>
              {isMounted &&
                items.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          )}
        </div>
      </StyledHeroContent>
    </StyledHeroWrapper>
  );
};

export default Hero;
