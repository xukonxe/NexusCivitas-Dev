import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: 4rem;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 5;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  
  span {
    display: block;
    background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 700px;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    box-shadow: 0 8px 30px rgba(110, 68, 255, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(110, 68, 255, 0.4);
    }
  }
  
  &.secondary {
    border: 2px solid var(--primary);
    color: var(--text-primary);
    
    &:hover {
      background: rgba(110, 68, 255, 0.1);
      transform: translateY(-3px);
    }
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .element {
    position: absolute;
    opacity: 0.6;
    will-change: transform;
  }
  
  .element-1 {
    top: 10%;
    right: 10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(110, 68, 255, 0.2) 0%, transparent 70%);
    animation: float 8s ease-in-out infinite;
  }
  
  .element-2 {
    bottom: 15%;
    left: 5%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 238, 255, 0.15) 0%, transparent 70%);
    animation: float 10s ease-in-out infinite 1s;
  }
  
  .element-3 {
    top: 40%;
    left: 20%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255, 70, 149, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite 0.5s;
  }
`;

const Hero = () => {
  return (
    <HeroContainer id="hero">
      <FloatingElements>
        <div className="element element-1"></div>
        <div className="element element-2"></div>
        <div className="element element-3"></div>
      </FloatingElements>
      
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          探索无限文明<br />
          <span>体验万千人生</span>
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          文明枢纽是一款由AI驱动的文明模拟器，让您探索、体验和影响各种现实或虚构的文明世界。从古埃及到未来科幻，每个文明都精细模拟至政治、经济、文化等多个维度。
        </HeroSubtitle>
        
        <ButtonContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            className="primary"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            开始探索
          </Button>
          <Button
            className="secondary"
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            了解更多
          </Button>
        </ButtonContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
