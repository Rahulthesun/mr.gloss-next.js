import React, { useEffect, useRef } from 'react';

interface RibbonCursorProps {
  color?: string;
  size?: number;
  trailLength?: number;
  speed?: number;
}

const RibbonCursor: React.FC<RibbonCursorProps> = ({
  color = '#ff0000',
  size = 8,
  trailLength = 20,
  speed = 0.8
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Touch move handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update trail
      const trail = trailRef.current;
      trail.push({ x: mouseRef.current.x, y: mouseRef.current.y });
      
      if (trail.length > trailLength) {
        trail.shift();
      }

      // Draw ribbon trail
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        
        for (let i = 1; i < trail.length; i++) {
          const point = trail[i];
          const prevPoint = trail[i - 1];
          
          // Create smooth curve
          const cpx = (prevPoint.x + point.x) / 2;
          const cpy = (prevPoint.y + point.y) / 2;
          
          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, cpy);
        }
        
        // Create gradient
        const gradient = ctx.createLinearGradient(
          trail[0].x, trail[0].y, 
          trail[trail.length - 1].x, trail[trail.length - 1].y
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Draw cursor dot
      if (trail.length > 0) {
        const lastPoint = trail[trail.length - 1];
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [color, size, trailLength, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default RibbonCursor; 