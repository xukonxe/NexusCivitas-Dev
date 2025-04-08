import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: var(--background);
  padding: 5rem 0 2rem;
  position: relative;
  overflow: hidden;
`;

const FooterWaves = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
    transform: rotateY(180deg);
    
    .shape-fill {
      fill: rgba(21, 21, 31, 0.8);
    }
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: var(--text-primary);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
    }
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  ul {
    list-style-type: none;
    
    li {
      margin-bottom: 0.8rem;
      
      a {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
        
        &:hover {
          color: var(--primary);
        }
        
        i {
          margin-right: 0.5rem;
          color: var(--primary);
        }
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--surface-light);
    color: var(--text-secondary);
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--primary);
      color: white;
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 0.9rem;
  
  a {
    color: var(--primary);
    text-decoration: none;
  }
`;

const EmailForm = styled.form`
  display: flex;
  margin-top: 1rem;
  
  input {
    flex-grow: 1;
    padding: 0.8rem 1rem;
    border: none;
    background: var(--surface-light);
    color: var(--text-primary);
    border-radius: 8px 0 0 8px;
    outline: none;
    
    &::placeholder {
      color: var(--text-secondary);
    }
  }
  
  button {
    padding: 0.8rem 1.5rem;
    border: none;
    background: var(--primary);
    color: white;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--primary-dark);
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWaves>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </FooterWaves>
      
      <FooterContent>
        <FooterSection>
          <h3>文明枢纽</h3>
          <p>探索无限文明，体验万千人生。我们的AI驱动文明模拟器让您沉浸在各种文明的精彩故事中。</p>
          <SocialLinks>
            <a href="#"><i>🌐</i></a>
            <a href="#"><i>✉️</i></a>
            <a href="#"><i>📱</i></a>
            <a href="#"><i>💻</i></a>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>快速链接</h3>
          <ul>
            <li><a href="#hero"><i>🏠</i> 首页</a></li>
            <li><a href="#features"><i>✨</i> 特性</a></li>
            <li><a href="#about"><i>ℹ️</i> 关于</a></li>
            <li><a href="#"><i>📄</i> 文档</a></li>
            <li><a href="#"><i>💬</i> 社区</a></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>联系我们</h3>
          <p>订阅我们的通讯，获取最新的开发进度和社区消息。</p>
          <EmailForm>
            <input type="email" placeholder="您的邮箱地址" />
            <button type="submit">订阅</button>
          </EmailForm>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} 文明枢纽 | Nexus Civitas. 保留所有权利。 <a href="#">隐私政策</a> | <a href="#">使用条款</a></p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
