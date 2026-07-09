import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  index: number;
  angle: number;
  color: string;
}

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let textPixels: { x: number; y: number }[] = [];
    let particles: Particle[] = [];
    let time = 0;
    let animId: number;

    let ORB_RADIUS_X = 0;
    let ORB_RADIUS_Y = 0;
    const ROTATION_SPEED = 0.002;
    const PULSE_SPEED = 0.02;
    const PULSE_AMOUNT = 20;
    const PARTICLE_RADIUS = 1.5;

    const COLORS = [
      'rgba(74, 222, 128, 0.6)',
      'rgba(34, 197, 94, 0.6)',
      'rgba(22, 163, 74, 0.6)',
      'rgba(187, 247, 208, 0.4)',
    ];

    const TEXT = 'NH3';

    function drawText() {
      const tSize = 800;
      const tCanvas = document.createElement('canvas');
      tCanvas.width = tSize;
      tCanvas.height = tSize;
      const tCtx = tCanvas.getContext('2d');
      if (!tCtx) return;

      const fontSize = Math.max(180, Math.min(400, width / 3));
      tCtx.font = '900 ' + fontSize + 'px "Inter", sans-serif';
      tCtx.fillStyle = 'white';
      tCtx.textBaseline = 'middle';
      tCtx.textAlign = 'center';
      tCtx.clearRect(0, 0, tSize, tSize);
      tCtx.fillText(TEXT, tSize / 2, tSize / 2);

      const imageData = tCtx.getImageData(0, 0, tSize, tSize).data;
      const pixels: { x: number; y: number }[] = [];

      for (let i = 0; i < imageData.length; i += 32) {
        const x = (i / 4) % tSize;
        const y = Math.floor((i / 4) / tSize);
        if (imageData[i + 3] >= 128) {
          pixels.push({ x, y });
        }
      }

      textPixels = pixels;
    }

    function buildParticles() {
      particles = textPixels.map((pixel, i) => {
        const baseX = (pixel.x - 400) * (width / 800) + width / 2;
        const baseY = (pixel.y - 400) * (width / 800) + height / 2;
        return {
          x: 0,
          y: 0,
          z: 0,
          baseX,
          baseY,
          index: i,
          angle: (i / textPixels.length) * Math.PI * 2,
          color: COLORS[i % COLORS.length],
        };
      });
    }

    function init() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      ORB_RADIUS_X = width / 4;
      ORB_RADIUS_Y = height / 5;

      drawText();
      buildParticles();
    }

    function render() {
      if (!ctx) return;
      time += 1;

      const cx = width / 2;
      const cy = height / 2;
      const pulse = Math.sin(time * PULSE_SPEED) * PULSE_AMOUNT;
      const rx = ORB_RADIUS_X + pulse;
      const ry = ORB_RADIUS_Y + pulse;

      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Draw all particles without shadowBlur (very expensive per-particle)
      // First pass: normal particles
      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z = Math.sin(p.angle) * ry;
        const scale = 400 / (400 + p.z);
        p.x = cx + Math.cos(p.angle) * rx * scale;
        p.y = (p.baseY - cy) * scale + cy;
        p.angle += ROTATION_SPEED;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Second pass: cheap glow using screen composite on a subset of particles
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = 'rgba(74, 222, 128, 0.08)';
      for (let i = 0; i < particles.length; i += 4) {
        const p = particles[i];
        const scale = 400 / (400 + p.z);
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS * scale * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      animId = requestAnimationFrame(render);
    }

    // Wait for font to load before drawing text
    document.fonts.ready.then(() => {
      init();
      render();
    });

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animId);
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
        zIndex: 1,
        pointerEvents: 'none',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default HeroCanvas;
