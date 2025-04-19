import React, { ReactNode } from 'react';

interface ModulePanelProps {
  children: ReactNode;
  title?: string;
  color?: string;
  className?: string;
}

const ModulePanel: React.FC<ModulePanelProps> = ({ 
  children, 
  title, 
  color = 'var(--panel-metal)',
  className = ''
}) => {
  return (
    <div 
      className={`module-panel ${className}`}
      style={{ backgroundColor: color }}
    >
      {title && (
        <div className="module-title">
          <h3>{title}</h3>
          <div className="leds">
            <div className="led active"></div>
            <div className="led"></div>
          </div>
        </div>
      )}
      {children}
      {/* Vis supplémentaires en bas */}
      <div className="screw-bottom-left"></div>
      <div className="screw-bottom-right"></div>
    </div>
  );
};

export default ModulePanel;
