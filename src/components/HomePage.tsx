import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import ModulePanel from "./modular-ui/ModulePanel";
import ModuleButton from "./modular-ui/ModuleButton";
import ModButton from "./modular-ui/ModButton";
import Waveform from "./modular-ui/Waveform";

interface HomePageProps {
  onGenerateSession: () => void;
  onOpenSettings: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onGenerateSession,
  onOpenSettings,
}) => {
  const [waveformType, setWaveformType] = useState<
    "sine" | "square" | "sawtooth" | "triangle"
  >("sine");

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveformType((prev) => {
        switch (prev) {
          case "sine":
            return "square";
          case "square":
            return "sawtooth";
          case "sawtooth":
            return "triangle";
          case "triangle":
            return "sine";
          default:
            return "sine";
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="modules-grid">
        <ModulePanel>
          <div className="generator-container">
            <div className="generator-circle">
              <ModButton onClick={onGenerateSession}>
                <span>Générer</span>
                <span>une</span>
                <span>session</span>
              </ModButton>
            </div>
          </div>
        </ModulePanel>
      </div>

      <ModulePanel title="PRINCIPES FONDAMENTAUX" className="principles-module">
        {/* Forme d'onde avec animation */}
        <div className="principles-waveform">
          <div className="principles-waveform-inner">
            <svg
              className="square-wave"
              viewBox="0 0 600 100"
              preserveAspectRatio="none"
            >
              <path d="M0,50 H100 V20 H200 V50 H300 V20 H400 V50 H500 V20 H600" />
            </svg>
            <div className="wave-metrics">
              <div className="metric-item">FREQ: 1.20kHz</div>
              <div className="metric-item">AMP: 75%</div>
              <div className="metric-item">SYNC: ON</div>
            </div>
            <div className="tech-details">
              <div className="metric-item">SYS.ID: PRINCIPLES</div>
              <div className="metric-item">MODULE: CV-001</div>
            </div>
          </div>
        </div>

        <div className="principle-item">Moins c'est mieux </div>
        <div className="principle-item">Ne rien préparer</div>
        <div className="principle-item">Jouer ensemble</div>
      </ModulePanel>

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
