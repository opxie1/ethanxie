"use client";

import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  initialSize: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 4;
    this.speedX = Math.random() * 0.35 - 0.175;
    this.speedY = -Math.random() * 1.8 - 1.2;
    this.life = 140;
    this.initialSize = this.size;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 1;
    this.size = Math.max(0, this.initialSize * (0.65 + this.life / 200));
  }
}

const GlobalSmoke = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'lighter';

      particlesRef.current = particlesRef.current
        .filter(particle => particle.life > 0 && particle.size > 0)
        .map(particle => {
          particle.update();
          if (particle.size > 0) {
            const opacity = Math.min(1, (particle.life / 140) * 1.35);
            const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2.4);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
            gradient.addColorStop(0.22, `rgba(255, 255, 255, ${opacity * 0.95})`);
            gradient.addColorStop(0.55, `rgba(255, 255, 255, ${opacity * 0.45})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.ellipse(particle.x, particle.y, particle.size * 0.75, particle.size * 2.2, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          return particle;
        });

      if (mousePosRef.current.x !== 0 || mousePosRef.current.y !== 0) {
        for (let i = 0; i < 4; i++) {
          particlesRef.current.push(
            new Particle(
              mousePosRef.current.x + (Math.random() * 2 - 1),
              mousePosRef.current.y + (Math.random() * 4 - 2)
            )
          );
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: 0, y: 0 };
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export { GlobalSmoke };
