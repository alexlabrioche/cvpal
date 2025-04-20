import React from "react";

interface ModuleButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ModuleButton: React.FC<ModuleButtonProps> = ({
  onClick,
  children,
  color = "var(--panel-light)",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      className={`module-button ${className}`}
      style={{ backgroundColor: disabled ? "#444" : color }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ModuleButton;
