import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(21, 21, 31, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    border-color: rgba(110, 68, 255, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(110, 68, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, rgba(110, 68, 255, 0.15) 0%, rgba(0, 238, 255, 0.15) 100%);
  
  i {
    font-size: 1.8rem;
    background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  flex-grow: 1;
`;

const Features = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const features = [
    {
      icon: '🌍',
      title: '深度文明模拟',
      description: '从地理环境到社会结构，从经济系统到文化信仰，25个维度的精细模拟创造出真实而复杂的文明生态。'
    },
    {
      icon: '👤',
      title: '沉浸式角色体验',
      description: '以各种身份进入文明，体验不同阶层、职业和背景人物的生活，做出影响个人命运和文明走向的选择。'
    },
    {
      icon: '⚡',
      title: '动态事件系统',
      description: '文明内部不断发生的自然灾害、政治变革、技术突破等事件，为游戏创造无限可能性。'
    },
    {
      icon: '🤖',
      title: 'AI驱动的交互',
      description: '通过大语言模型实现与NPC的自然对话，以及文明发展的逻辑推演和内容生成。'
    },
    {
      icon: '📊',
      title: '可视化界面',
      description: '直观的UI展示文明参数、地图、角色状态和事件，增强游戏体验。'
    },
    {
      icon: '🔄',
      title: '持续进化',
      description: '随着模型的更新迭代，游戏内容更加丰富，逻辑更加完善，体验更加真实。'
    }
  ];
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };
  
  return (
    <FeaturesSection id="features">
      <SectionTitle
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        核心<span>特性</span>
      </SectionTitle>
      
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardVariants}
          >
            <FeatureIcon>
              <i>{feature.icon}</i>
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features;
