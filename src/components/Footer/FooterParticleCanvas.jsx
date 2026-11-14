import React, { useEffect, useRef } from 'react';

const FooterParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: 350 };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 40 Gentle golden stardust embers drifting upward
    const PARTICLE_COUNT = 45;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.0 + 0.6,
        vy: -(Math.random() * 0.35 + 0.12),
        vx: (Math.random() - 0.5) * 0.25,
        baseAlpha: Math.random() * 0.45 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2
      });
    }

    // 8 Delicate twinkling 4-point gala stars
    const STAR_COUNT = 8;
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.85,
        size: Math.random() * 10 + 6,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.025 + 0.012
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        loop(lastTime);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let lastTime = performance.now();

    const drawFourPointStar = (cx, cy, spikes, outerRadius, innerRadius, alpha) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.fillStyle = `rgba(234, 219, 192, ${alpha})`;
      ctx.shadowColor = 'rgba(197, 160, 89, 0.8)';
      ctx.shadowBlur = 10;

      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const loop = (currentTime) => {
      if (!isVisible) return;
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle top-center golden spotlight ambient glow
      const spotGlow = ctx.createRadialGradient(
        width / 2, 40, 10,
        width / 2, 40, width * 0.45
      );
      spotGlow.addColorStop(0, 'rgba(197, 160, 89, 0.09)');
      spotGlow.addColorStop(0.5, 'rgba(197, 160, 89, 0.03)');
      spotGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = spotGlow;
      ctx.fillRect(0, 0, width, height);

      // Update and draw floating stardust particles
      for (let p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        p.phase += p.twinkleSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0, p.baseAlpha + Math.sin(p.phase) * 0.25);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(234, 219, 192, 0.7)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      // Draw delicate twinkling stars
      for (let s of stars) {
        s.phase += s.speed;
        const starAlpha = Math.pow(Math.max(0, Math.sin(s.phase)), 3) * 0.85;

        if (starAlpha > 0.03) {
          drawFourPointStar(
            s.x,
            s.y,
            4,
            s.size,
            s.size * 0.2,
            starAlpha
          );
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default FooterParticleCanvas;
