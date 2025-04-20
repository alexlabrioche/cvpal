import React from "react";
import { Settings } from "lucide-react";
import ModulePanel from "./modular-ui/ModulePanel";
import ModuleButton from "./modular-ui/ModuleButton";
import ModButton from "./modular-ui/ModButton";

interface HomePageProps {
  onGenerateSession: () => void;
  onOpenSettings: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onGenerateSession,
  onOpenSettings,
}) => {
  return (
    <div>
      <div className="modules-grid">
        <ModulePanel
          title="PRINCIPES FONDAMENTAUX"
          className="principles-module"
        >
          <div className="principle-item">Moins c'est mieux </div>
          <div className="principle-item">Ne rien préparer</div>
          <div className="principle-item">Jouer ensemble</div>
        </ModulePanel>

        <ModulePanel>
          <div className="generator-container">
            <div className="generator-circle">
              <ModButton onClick={onGenerateSession}>&nbsp;</ModButton>
            </div>
          </div>
        </ModulePanel>
      </div>

      <div className="settings-container">
        <ModuleButton
          size="sm"
          onClick={onOpenSettings}
          className="settings-button w-full"
        >
          <Settings size={18} />
          <span>Paramètres</span>
        </ModuleButton>
      </div>
    </div>
  );
};

export default HomePage;
