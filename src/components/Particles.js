import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // 重新创建粒子
      createParticles();
    };
    
    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 10);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          directionX: Math.random() * 2 - 1,
          directionY: Math.random() * 2 - 1,
          color: i % 3 === 0 
            ? 'rgba(110, 68, 255, 0.6)' 
            : i % 3 === 1 
              ? 'rgba(0, 238, 255, 0.6)' 
              : 'rgba(255, 70, 149, 0.6)'
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // 移动粒子
        particle.x += particle.directionX * particle.speed;
        particle.y += particle.directionY * particle.speed;
        
        // 边界检查
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.directionX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.directionY *= -1;
        }
      });
      
      // 绘制连线
      connectParticles();
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="particles" />;
};

export default Particles;
