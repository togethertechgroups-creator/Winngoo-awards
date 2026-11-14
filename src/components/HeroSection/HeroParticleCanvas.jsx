import React, { useEffect, useRef } from 'react';

const HeroParticleCanvas = () => {
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
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
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

    // Particle types for Award Gala show:
    // 1. Golden Dust (gentle rising floating specks)
    // 2. Twinkling Diamond Sparkles (4-pointed star flashes)
    // 3. Volumetric Spotlight Beams (gentle sweeping theatrical award lights)

    const PARTICLE_COUNT = 75;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        vy: -(Math.random() * 0.45 + 0.15),
        vx: (Math.random() - 0.5) * 0.3,
        baseAlpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.3 ? 'gold' : 'amber'
      });
    }

    // 14 Twinkling Gala Stars (4-point sparkle flashes)
    const STAR_COUNT = 14;
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.85,
        size: Math.random() * 12 + 6,
        alpha: 0,
        targetAlpha: Math.random() * 0.7 + 0.3,
        fadingIn: true,
        fadeSpeed: Math.random() * 0.015 + 0.008,
        pause: Math.floor(Math.random() * 120),
        angle: Math.random() * Math.PI
      });
    }

    // 3 Volumetric Spotlight Beams sweeping across the gala stage
    const spotlights = [
      {
        baseX: 0.15, // 15% from left
        sweepRange: 0.22,
        speed: 0.0007,
        phase: 0,
        width: 140,
        color: 'rgba(234, 219, 192, 0.045)'
      },
      {
        baseX: 0.55, // Center
        sweepRange: 0.28,
        speed: 0.0005,
        phase: Math.PI / 3,
        width: 180,
        color: 'rgba(197, 160, 89, 0.055)'
      },
      {
        baseX: 0.85, // Right
        sweepRange: 0.25,
        speed: 0.0006,
        phase: Math.PI,
        width: 160,
        color: 'rgba(234, 219, 192, 0.04)'
      }
    ];

    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // ──────────────────────────────────────────────
      // 1. Draw Volumetric Award Show Spotlights
      // ──────────────────────────────────────────────
      spotlights.forEach((spot) => {
        const currentAngle = Math.sin(time * spot.speed + spot.phase) * spot.sweepRange;
        const originX = width * spot.baseX;
        const originY = height + 40;

        // Target point high in the sky
        const targetX = originX + Math.sin(currentAngle) * height * 1.2;
        const targetY = -100;

        const grad = ctx.createLinearGradient(originX, originY, targetX, targetY);
        grad.addColorStop(0, 'rgba(197, 160, 89, 0.09)');
        grad.addColorStop(0.5, spot.color);
        grad.addColorStop(1, 'rgba(197, 160, 89, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(originX - 15, originY);
        ctx.lineTo(targetX - spot.width * 1.5, targetY);
        ctx.lineTo(targetX + spot.width * 1.5, targetY);
        ctx.lineTo(originX + 15, originY);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      // ──────────────────────────────────────────────
      // 2. Draw Floating Golden Stardust Particles
      // ──────────────────────────────────────────────
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * 0.02 + p.phase) * 0.2;
        p.phase += p.twinkleSpeed;

        // Wrap around seamlessly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Soft radial glow for gold particles
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8);
        if (p.color === 'gold') {
          radGrad.addColorStop(0, `rgba(245, 225, 175, ${currentAlpha})`);
          radGrad.addColorStop(0.4, `rgba(197, 160, 89, ${currentAlpha * 0.7})`);
          radGrad.addColorStop(1, 'rgba(197, 160, 89, 0)');
        } else {
          radGrad.addColorStop(0, `rgba(255, 245, 220, ${currentAlpha})`);
          radGrad.addColorStop(0.5, `rgba(234, 219, 192, ${currentAlpha * 0.6})`);
          radGrad.addColorStop(1, 'rgba(234, 219, 192, 0)');
        }

        ctx.fillStyle = radGrad;
        ctx.fill();
        ctx.restore();
      });

      // ──────────────────────────────────────────────
      // 3. Draw Twinkling 4-Point Gala Stars
      // ──────────────────────────────────────────────
      stars.forEach((s) => {
        if (s.pause > 0) {
          s.pause--;
          return;
        }

        if (s.fadingIn) {
          s.alpha += s.fadeSpeed;
          if (s.alpha >= s.targetAlpha) {
            s.fadingIn = false;
          }
        } else {
          s.alpha -= s.fadeSpeed;
          if (s.alpha <= 0) {
            s.alpha = 0;
            s.fadingIn = true;
            s.pause = Math.floor(Math.random() * 90) + 30;
            s.x = Math.random() * width;
            s.y = Math.random() * (height * 0.85);
            s.size = Math.random() * 11 + 5;
            s.targetAlpha = Math.random() * 0.7 + 0.3;
          }
        }

        if (s.alpha > 0) {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.angle);

          const r = s.size;
          const innerR = r * 0.18;

          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const rot = (i * Math.PI) / 2;
            ctx.lineTo(Math.cos(rot) * r, Math.sin(rot) * r);
            ctx.lineTo(Math.cos(rot + Math.PI / 4) * innerR, Math.sin(rot + Math.PI / 4) * innerR);
          }
          ctx.closePath();

          ctx.fillStyle = `rgba(255, 248, 230, ${s.alpha})`;
          ctx.shadowColor = 'rgba(234, 219, 192, 0.8)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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

export default HeroParticleCanvas;
