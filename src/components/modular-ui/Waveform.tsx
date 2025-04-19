import React, { useEffect, useRef } from 'react';

interface WaveformProps {
  type?: 'sine' | 'square' | 'sawtooth' | 'triangle' | 'noise';
  color?: string;
  speed?: number;
  height?: number;
  active?: boolean;
  className?: string;
}

const Waveform: React.FC<WaveformProps> = ({
  type = 'sine',
  color = 'var(--cable-green)',
  speed = 1,
  height = 40,
  active = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw waveform
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      
      const centerY = rect.height / 2;
      const amplitude = rect.height / 3;
      
      // Draw different waveform types
      for (let x = 0; x < rect.width; x++) {
        let y = 0;
        const frequency = 0.02 * speed;
        
        switch (type) {
          case 'sine':
            y = centerY + Math.sin((x + offset) * frequency) * amplitude;
            break;
          case 'square':
            y = centerY + (Math.sin((x + offset) * frequency) >= 0 ? 1 : -1) * amplitude;
            break;
          case 'sawtooth':
            y = centerY + (((x + offset) * frequency) % (2 * Math.PI) / Math.PI - 1) * amplitude;
            break;
          case 'triangle':
            y = centerY + (Math.abs(((x + offset) * frequency) % (4 * Math.PI) - 2 * Math.PI) - Math.PI) * amplitude / Math.PI;
            break;
          case 'noise':
            y = centerY + (Math.random() * 2 - 1) * amplitude * 0.5;
            break;
        }
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Update offset for animation
      offset += speed;
      
      // Continue animation
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, color, speed, type]);

  return (
    <div className={`waveform-container ${className}`} style={{ height: `${height}px` }}>
      <canvas 
        ref={canvasRef} 
        className="waveform-canvas"
        style={{ 
          display: active ? 'block' : 'none',
          width: '100%', 
          height: '100%',
          background: 'var(--jack-black)',
          borderRadius: '4px'
        }}
      />
      {!active && (
        <div className="waveform-inactive" style={{ 
          height: '100%',
          background: 'var(--jack-black)',
          borderRadius: '4px'
        }} />
      )}
    </div>
  );
};

export default Waveform;
