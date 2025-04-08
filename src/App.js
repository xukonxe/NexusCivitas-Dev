import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import Particles from './components/Particles';
import ChatContextManager from './components/ChatContextManager';

function App() {
  useEffect(() => {
    // 禁用右键菜单以提供更好的体验
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // 鼠标跟踪效果
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <Particles />
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <Features />
        <About />
        <ChatContextManager />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
