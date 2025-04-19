import React, { useState } from "react";
import { useGameStore } from "../store/use-game-store";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  ChevronLeft,
  Plus,
  X,
  Sliders,
  Clock,
  Tag,
  Wrench,
} from "lucide-react";
import ModulePanel from "./modular-ui/ModulePanel";
import ModuleButton from "./modular-ui/ModuleButton";
import Jack from "./modular-ui/Jack";
import Waveform from "./modular-ui/Waveform";

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const settings = useGameStore((state) => state.settings);
  const updatePlayerCountRange = useGameStore(
    (state) => state.updatePlayerCountRange
  );
  const updateTimeRange = useGameStore((state) => state.updateTimeRange);
  const addTheme = useGameStore((state) => state.addTheme);
  const removeTheme = useGameStore((state) => state.removeTheme);
  const addConstraint = useGameStore((state) => state.addConstraint);
  const removeConstraint = useGameStore((state) => state.removeConstraint);

  const [newTheme, setNewTheme] = useState("");
  const [newConstraint, setNewConstraint] = useState("");

  // Active tab state
  const [activeModule, setActiveModule] = useState<
    "players" | "time" | "themes" | "constraints"
  >("players");

  // Handle player count range change
  const handlePlayerCountChange = (values: number[]) => {
    if (values.length === 2) {
      updatePlayerCountRange(values[0], values[1]);
    }
  };

  // Handle time range change
  const handleTimeRangeChange = (values: number[]) => {
    if (values.length === 2) {
      updateTimeRange(values[0], values[1]);
    }
  };

  // Handle add theme
  const handleAddTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTheme.trim()) {
      addTheme(newTheme.trim());
      setNewTheme("");
    }
  };

  // Handle add constraint
  const handleAddConstraint = (e: React.FormEvent) => {
    e.preventDefault();
    if (newConstraint.trim()) {
      addConstraint(newConstraint.trim());
      setNewConstraint("");
    }
  };

  return (
    <div>
      <ModuleButton onClick={onBack} size="sm" className="back-button w-full">
        <ChevronLeft size={18} />
        <span>Retour</span>
      </ModuleButton>
      <div className="settings-modules-nav">
        <ModuleButton
          size="sm"
          onClick={() => setActiveModule("players")}
          className={activeModule === "players" ? "active" : ""}
        >
          <Sliders size={16} />
          <span>Joueurs</span>
        </ModuleButton>

        <ModuleButton
          size="sm"
          onClick={() => setActiveModule("time")}
          className={activeModule === "time" ? "active" : ""}
        >
          <Clock size={16} />
          <span>Temps</span>
        </ModuleButton>

        <ModuleButton
          size="sm"
          onClick={() => setActiveModule("themes")}
          className={activeModule === "themes" ? "active" : ""}
        >
          <Tag size={16} />
          <span>Thèmes</span>
        </ModuleButton>

        <ModuleButton
          size="sm"
          onClick={() => setActiveModule("constraints")}
          className={activeModule === "constraints" ? "active" : ""}
        >
          <Wrench size={16} />
          <span>Contraintes</span>
        </ModuleButton>
      </div>

      <div className="settings-modules">
        {activeModule === "players" && (
          <ModulePanel title="Nombre de joueurs" className="settings-module">
            <div className="settings-module-content">
              <div className="settings-description">
                <p>Définir la plage du nombre de joueurs pour chaque session</p>
                <div className="settings-value">
                  <span>Min: {settings.playerCountRange.min}</span>
                  <span>Max: {settings.playerCountRange.max}</span>
                </div>
              </div>

              <div className="visualizer">
                <Waveform type="sine" color="var(--cable-red)" height={25} />
              </div>

              <div className="slider-container">
                <Slider
                  defaultValue={[
                    settings.playerCountRange.min,
                    settings.playerCountRange.max,
                  ]}
                  max={8}
                  min={1}
                  step={1}
                  onValueChange={handlePlayerCountChange}
                  className="settings-slider"
                />

                <div className="slider-jacks">
                  <Jack color="var(--cable-red)" active={true} />
                  <Jack color="var(--cable-red)" active={true} />
                </div>
              </div>
            </div>
          </ModulePanel>
        )}

        {activeModule === "time" && (
          <ModulePanel title="Temps par joueur" className="settings-module">
            <div className="settings-module-content">
              <div className="settings-description">
                <p>Définir la plage de temps (en minutes) par joueur</p>
                <div className="settings-value">
                  <span>Min: {settings.timeRange.min}</span>
                  <span>Max: {settings.timeRange.max}</span>
                </div>
              </div>

              <div className="visualizer">
                <Waveform
                  type="sawtooth"
                  color="var(--cable-blue)"
                  height={25}
                />
              </div>

              <div className="slider-container">
                <Slider
                  defaultValue={[
                    settings.timeRange.min,
                    settings.timeRange.max,
                  ]}
                  max={15}
                  min={1}
                  step={1}
                  onValueChange={handleTimeRangeChange}
                  className="settings-slider"
                />

                <div className="slider-jacks">
                  <Jack color="var(--cable-blue)" active={true} />
                  <Jack color="var(--cable-blue)" active={true} />
                </div>
              </div>
            </div>
          </ModulePanel>
        )}

        {activeModule === "themes" && (
          <ModulePanel title="Thématiques" className="settings-module">
            <div className="settings-module-content">
              <div className="settings-description">
                <p>
                  Gérer la liste des thématiques possibles pour les sessions
                </p>
              </div>

              <div className="tags-container">
                {settings.themes.map((theme) => (
                  <div key={theme} className="tag-item">
                    <Jack color="var(--cable-yellow)" active={true} />
                    <span>{theme}</span>
                    <button
                      className="tag-remove"
                      onClick={() => removeTheme(theme)}
                      aria-label={`Supprimer ${theme}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddTheme} className="add-tag-form">
                <div className="input-container">
                  <Label htmlFor="add-theme" className="sr-only">
                    Ajouter une thématique
                  </Label>
                  <Input
                    id="add-theme"
                    placeholder="Ajouter une thématique"
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    className="module-input"
                  />
                </div>
                <ModuleButton type="submit" size="sm">
                  <Plus size={16} />
                </ModuleButton>
              </form>
            </div>
          </ModulePanel>
        )}

        {activeModule === "constraints" && (
          <ModulePanel title="Contraintes" className="settings-module">
            <div className="settings-module-content">
              <div className="settings-description">
                <p>
                  Gérer la liste des contraintes possibles pour les sessions
                </p>
              </div>

              <div className="tags-container">
                {settings.constraints.map((constraint) => (
                  <div key={constraint} className="tag-item">
                    <Jack color="var(--cable-green)" active={true} />
                    <span>{constraint}</span>
                    <button
                      className="tag-remove"
                      onClick={() => removeConstraint(constraint)}
                      aria-label={`Supprimer ${constraint}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddConstraint} className="add-tag-form">
                <div className="input-container">
                  <Label htmlFor="add-constraint" className="sr-only">
                    Ajouter une contrainte
                  </Label>
                  <Input
                    id="add-constraint"
                    placeholder="Ajouter une contrainte"
                    value={newConstraint}
                    onChange={(e) => setNewConstraint(e.target.value)}
                    className="module-input"
                  />
                </div>
                <ModuleButton type="submit" size="sm">
                  <Plus size={16} />
                </ModuleButton>
              </form>
            </div>
          </ModulePanel>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
