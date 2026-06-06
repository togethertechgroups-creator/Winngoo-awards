import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const COLORS = [
  'rgba(192, 192, 192, 0.18)', // Silver bokeh
  'rgba(255, 240, 200, 0.12)', // Warm white
  'rgba(185, 28, 28, 0.10)', // Crimson
  'rgba(30, 60, 180, 0.08)' // Deep blue
];

const BokehBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const orbCount = isMobile ? 7 : 14;
    
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing orbs in case of strict mode double mount
    container.innerHTML = '';
    const orbs = [];

    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      
      const size = isMobile 
        ? gsap.utils.random(40, 120) 
        : gsap.utils.random(60, 220);
        
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const blur = gsap.utils.random(28, 55);

      Object.assign(orb.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: `blur(${blur}px)`,
        top: `${gsap.utils.random(0, 100)}%`,
        left: `${gsap.utils.random(0, 100)}%`,
        opacity: isReducedMotion ? 0.3 : 0,
        willChange: 'transform, opacity',
        pointerEvents: 'none'
      });

      container.appendChild(orb);
      orbs.push(orb);
    }

    let tweens = [];

    if (!isReducedMotion) {
      orbs.forEach(orb => {
        const tween = gsap.to(orb, {
          y: `random(-60, 60)`,
          x: `random(-30, 30)`,
          opacity: `random(0.3, 0.9)`,
          duration: `random(5, 10)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: `random(0, 5)`
        });
        tweens.push(tween);
      });
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tweens.forEach(t => t.pause());
      } else {
        tweens.forEach(t => t.play());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      tweens.forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
};

export default BokehBackground;
