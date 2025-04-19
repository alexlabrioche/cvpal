import React, { useState, useEffect, useRef, useCallback } from 'react';

interface KnobProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  className?: string;
}

const Knob: React.FC<KnobProps> = ({ 
  value, 
  min, 
  max, 
  onChange, 
  size = 'md',
  color = '#222',
  label,
  className = ''
}) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startValue, setStartValue] = useState(value);

  const sizePx = {
    sm: 40,
    md: 60,
    lg: 80
  };

  // Normalize value to rotation (0-270 degrees)
  const rotationDegrees = ((value - min) / (max - min)) * 270;

  // Handle mouse/touch drag
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setDragging(true);
    
    // Get starting position
    if ('touches' in e) {
      setStartY(e.touches[0].clientY);
    } else {
      setStartY(e.clientY);
    }
    
    setStartValue(value);
    
    // Prevent text selection
    e.preventDefault();
  }, [value]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragging) return;
    
    let currentY: number;
    
    // Get current position
    if ('touches' in e) {
      currentY = e.touches[0].clientY;
    } else {
      currentY = e.clientY;
    }
    
    // Calculate vertical movement (negative = up = increase)
    const diff = startY - currentY;
    
    // Sensitivity factor (adjust as needed)
    const sensitivity = (max - min) / 200;
    
    // Calculate new value
    let newValue = startValue + diff * sensitivity;
    
    // Clamp value to min/max
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Update value
    onChange(newValue);
    
  }, [dragging, min, max, onChange, startValue, startY]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Setup and cleanup event listeners
  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={`knob-container ${className}`}>
      {label && <div className="knob-label">{label}</div>}
      <div 
        ref={knobRef}
        className="knob"
        style={{ 
          width: sizePx[size], 
          height: sizePx[size], 
          backgroundColor: color,
          transform: `rotate(${rotationDegrees}deg)`
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="knob-indicator" />
      </div>
      <div className="knob-value">{Math.round(value)}</div>
    </div>
  );
};

export default Knob;
