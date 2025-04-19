import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  background: ${props => props.scrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    height: 40px;
    margin-right: 0.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: var(--text-primary);
    
    &::after {
      width: 100%;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const Burger = styled.div`
  width: 30px;
  height: 20px;
  position: relative;
  
  span {
    position: absolute;
    width: 100%;
    height: 2px;
    background: var(--text-primary);
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:nth-child(1) {
      top: ${props => props.isOpen ? '50%' : '0'};
      transform: ${props => props.isOpen ? 'translate(0, -50%) rotate(45deg)' : 'none'};
    }
    
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${props => props.isOpen ? 0 : 1};
    }
    
    &:nth-child(3) {
      bottom: ${props => props.isOpen ? '50%' : '0'};
      transform: ${props => props.isOpen ? 'translate(0, 50%) rotate(-45deg)' : 'none'};
    }
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background: var(--surface);
  z-index: 999;
  padding: 6rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--text-primary);
    }
  }
`;

const DevButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: rgba(255, 68, 146, 0.2);
  color: #ff4492;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  margin-left: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 68, 146, 0.3);
    transform: translateY(-2px);
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <NavbarContainer scrolled={scrolled}>
      <NavInner>
        <Logo
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span>NEXUS CIVITAS</span>
        </Logo>
        
        <NavLinks>
          {['首页', '特性', '关于', '文档', '社区'].map((link, index) => (
            <NavLink
              key={link}
              href={`#${link === '首页' ? 'hero' : link.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link}
            </NavLink>
          ))}
          <DevButton to="/debug">开发者工具</DevButton>
        </NavLinks>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Burger isOpen={isMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </Burger>
        </MobileMenuButton>
        
        {isMenuOpen && (
          <MobileMenu
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {['首页', '特性', '关于', '文档', '社区'].map((link) => (
              <a
                key={link}
                href={`#${link === '首页' ? 'hero' : link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </MobileMenu>
        )}
      </NavInner>
    </NavbarContainer>
  );
};

export default Navbar;
