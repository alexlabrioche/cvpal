import React, { useState } from "react";
import { useGameStore } from "../store/use-game-store";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { X, Plus, ChevronLeft } from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const settings = useGameStore((state) => state.settings);
  const updatePlayerCountRange = useGameStore((state) => state.updatePlayerCountRange);
  const updateTimeRange = useGameStore((state) => state.updateTimeRange);
  const addTheme = useGameStore((state) => state.addTheme);
  const removeTheme = useGameStore((state) => state.removeTheme);
  const addConstraint = useGameStore((state) => state.addConstraint);
  const removeConstraint = useGameStore((state) => state.removeConstraint);

  const [newTheme, setNewTheme] = useState("");
  const [newConstraint, setNewConstraint] = useState("");

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
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-button" onClick={onBack}>
          <ChevronLeft size={24} />
          <span>Retour</span>
        </button>
        <h1 className="title">Paramètres</h1>
      </div>

      <ScrollArea className="settings-content">
        <div className="setting-section">
          <h2>Nombre de joueurs</h2>
          <p className="setting-description">
            Min: {settings.playerCountRange.min} - Max: {settings.playerCountRange.max}
          </p>
          <Slider
            defaultValue={[settings.playerCountRange.min, settings.playerCountRange.max]}
            max={8}
            min={1}
            step={1}
            onValueChange={handlePlayerCountChange}
            className="my-4"
          />
        </div>

        <Separator className="my-6" />

        <div className="setting-section">
          <h2>Temps par joueur (minutes)</h2>
          <p className="setting-description">
            Min: {settings.timeRange.min} - Max: {settings.timeRange.max}
          </p>
          <Slider
            defaultValue={[settings.timeRange.min, settings.timeRange.max]}
            max={15}
            min={1}
            step={1}
            onValueChange={handleTimeRangeChange}
            className="my-4"
          />
        </div>

        <Separator className="my-6" />

        <div className="setting-section">
          <h2>Thématiques</h2>
          <div className="tag-list">
            {settings.themes.map((theme) => (
              <div key={theme} className="tag">
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

          <form onSubmit={handleAddTheme} className="add-form">
            <Label htmlFor="add-theme" className="sr-only">
              Ajouter une thématique
            </Label>
            <Input
              id="add-theme"
              placeholder="Ajouter une thématique"
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
            />
            <Button type="submit" size="sm" variant="outline">
              <Plus size={16} />
            </Button>
          </form>
        </div>

        <Separator className="my-6" />

        <div className="setting-section">
          <h2>Contraintes</h2>
          <div className="tag-list">
            {settings.constraints.map((constraint) => (
              <div key={constraint} className="tag">
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

          <form onSubmit={handleAddConstraint} className="add-form">
            <Label htmlFor="add-constraint" className="sr-only">
              Ajouter une contrainte
            </Label>
            <Input
              id="add-constraint"
              placeholder="Ajouter une contrainte"
              value={newConstraint}
              onChange={(e) => setNewConstraint(e.target.value)}
            />
            <Button type="submit" size="sm" variant="outline">
              <Plus size={16} />
            </Button>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SettingsPage;
