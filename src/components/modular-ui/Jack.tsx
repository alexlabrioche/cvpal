import React from 'react';

interface JackProps {
  label?: string;
  color?: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const Jack: React.FC<JackProps> = ({ 
  label, 
  color = 'var(--jack-black)',
  active = false,
  className = '',
  onClick
}) => {
  return (
    <div className={`jack-container ${className}`}>
      {label && <div className="jack-label">{label}</div>}
      <div 
        className={`jack ${active ? 'active' : ''}`}
        style={{ border: active ? `2px solid ${color}` : 'none' }}
        onClick={onClick}
      />
    </div>
  );
};

export default Jack;
