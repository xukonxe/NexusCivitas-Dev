import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--background) 0%, rgba(21, 21, 31, 0.8) 100%);
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  
  span {
    background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutContent = styled(motion.div)`
  color: var(--text-secondary);
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-size: 1.1rem;
  }
  
  h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  ul {
    list-style-type: none;
    margin-bottom: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
      
      &:before {
        content: '✦';
        position: absolute;
        left: 0;
        color: var(--primary);
      }
    }
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  
  .glass-panel {
    width: 90%;
    height: 90%;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    opacity: 0.8;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(110, 68, 255, 0.2) 0%, rgba(0, 238, 255, 0.2) 100%);
    border-radius: 16px;
    pointer-events: none;
  }
  
  .floating-badge {
    position: absolute;
    bottom: -20px;
    right: -20px;
    padding: 1rem 2rem;
    background: var(--primary);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(110, 68, 255, 0.4);
  }
`;

const About = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <AboutSection id="about">
      <AboutContainer>
        <SectionTitle
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          关于<span>项目</span>
        </SectionTitle>
        
        <ContentWrapper>
          <AboutContent
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3>文明枢纽的创新理念</h3>
            <p>
              文明枢纽（Nexus Civitas）是一款创新的AI驱动文明模拟器，旨在为玩家提供前所未有的沉浸式文明体验。我们利用最先进的大语言模型技术，构建了一个可以精确模拟各类文明的虚拟世界。
            </p>
            <p>
              无论您对哪个时代、哪种文明感兴趣，从古埃及到未来科幻世界，从真实历史到奇幻王国，文明枢纽都能为您创造一个丰富多彩、逻辑自洽的世界。
            </p>
            <h3>核心技术优势</h3>
            <ul>
              <li>大语言模型驱动的内容生成</li>
              <li>25个文明维度的精细模拟</li>
              <li>自适应事件系统</li>
              <li>角色与环境的深度交互</li>
              <li>持续进化的游戏世界</li>
            </ul>
          </AboutContent>
          
          <ImageWrapper
            ref={imageRef}
            initial={{ opacity: 0, x: 50 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glow"
          >
            <div className="glass-panel">
              <img src="https://via.placeholder.com/600x400?text=Nexus+Civitas" alt="文明枢纽游戏概念图" />
            </div>
            <div className="floating-badge">AI驱动体验</div>
          </ImageWrapper>
        </ContentWrapper>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
