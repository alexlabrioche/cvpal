import React from 'react';

interface ModButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ModButton: React.FC<ModButtonProps> = ({
  onClick,
  children,
  className = ''
}) => {
  return (
    <div className={`mod-button-container ${className}`}>
      <button
        className="mod-button"
        onClick={onClick}
      >
        <div className="mod-button-inner">
          <div className="mod-button-shine"></div>
          <div className="mod-button-content">
            {children}
          </div>
        </div>
      </button>
      <div className="mod-button-ring"></div>
      <div className="mod-button-glow"></div>
    </div>
  );
};

export default ModButton;