import React, { useState, useEffect } from "react";
import { Cpu, Clock, Zap, Bookmark } from "lucide-react";
import type { GameSession } from "../store/use-game-store";
import { formatTime } from "../lib/utils";
import ModulePanel from "./modular-ui/ModulePanel";
import ModuleButton from "./modular-ui/ModuleButton";
import Jack from "./modular-ui/Jack";

interface ResultPageProps {
  session: GameSession;
  onBackToHome: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ session, onBackToHome }) => {
  // État pour l'animation d'analyse
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [gridItems, setGridItems] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // Génération de l'animation d'analyse
  useEffect(() => {
    if (showAnalysis) {
      // Générer la grille progressivement
      const totalItems = 80;
      const currentItems: number[] = [];
      let count = 0;

      const gridInterval = setInterval(() => {
        // Ajouter 3-5 items à chaque intervalle
        const itemsToAdd = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < itemsToAdd && count < totalItems; i++) {
          currentItems.push(count++);
          setGridItems([...currentItems]);
        }

        if (count >= totalItems) {
          clearInterval(gridInterval);
        }
      }, 50);

      // Messages du log d'analyse
      const logMessages = [
        "> Initialisation du système...",
        "> Analyse des paramètres de session...",
        "> Calibration des algorithmes de randomisation...",
        "> Vérification des contraintes de consistance...",
        "> Sélection des variables optimales...",
        "> Application des facteurs de créativité...",
        "> Validation des paramètres générés...",
        "> Session générée avec succès.",
      ];

      // Afficher les logs progressivement
      let logIndex = 0;
      const logInterval = setInterval(() => {
        if (logIndex < logMessages.length) {
          setLogs((prev) => [...prev, logMessages[logIndex]]);
          logIndex++;
        } else {
          clearInterval(logInterval);
        }
      }, 400);

      // Mise à jour de la barre de progression
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newValue = prev + 2;
          return newValue >= 100 ? 100 : newValue;
        });
      }, 60);

      // Terminer l'animation et afficher les résultats
      const timer = setTimeout(() => {
        setShowAnalysis(false);
        setTimeout(() => {
          setAnalysisComplete(true);
        }, 300);
      }, 3300);

      return () => {
        clearInterval(gridInterval);
        clearInterval(logInterval);
        clearInterval(progressInterval);
        clearTimeout(timer);
      };
    }
  }, [showAnalysis]);

  return (
    <div className="result-page">
      {/* Overlay d'analyse high-tech */}
      <div className={`ai-analysis-overlay ${showAnalysis ? "active" : ""}`}>
        <div className="ai-analysis-content">
          <h2 className="ai-title">Analyse et génération en cours</h2>

          <div className="ai-grid" style={{ position: "relative" }}>
            <div className="ai-scanner"></div>
            {gridItems.map((id) => (
              <div
                key={id}
                className="ai-grid-item"
                style={{
                  animationDelay: `${id * 0.01}s`,
                  backgroundColor: `rgba(83, 109, 254, ${
                    Math.random() * 0.2 + 0.05
                  })`,
                }}
              ></div>
            ))}
          </div>

          <div className="ai-log">
            {logs.map((log, index) => (
              <div
                key={index}
                className="ai-log-entry"
                style={{ animationDelay: `${index * 0.4}s` }}
              >
                {log}
                {index === logs.length - 1 && (
                  <span className="ai-log-cursor"></span>
                )}
              </div>
            ))}
          </div>

          <div className="ai-progress">
            <div
              className="ai-progress-bar"
              style={{
                width: `${progress}%`,
                animationPlayState: progress >= 100 ? "paused" : "running",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Module des résultats */}
      <ModulePanel title="Paramètres de session" className="result-module">
        {/* Lignes de connexion */}
        {analysisComplete && (
          <div style={{ position: "relative", height: "100%" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="connection-line"
                style={{
                  top: `${22 + i * 24}%`,
                  left: "5%",
                  width: "90%",
                  animationDelay: `${0.6 + i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Paramètres générés */}
        <div className="result-parameters">
          <div className={`result-item ${analysisComplete ? "show" : ""}`}>
            <div className="result-item-header">
              <Cpu size={16} />
              <h3>Joueurs</h3>
              <div className="led active"></div>
            </div>
            <div className="result-value-container">
              <Jack active={analysisComplete} color="var(--cable-green)" />
              <p className="result-value">{session.playerCount}</p>
            </div>
          </div>

          <div className={`result-item ${analysisComplete ? "show" : ""}`}>
            <div className="result-item-header">
              <Clock size={16} />
              <h3>Temps total</h3>
              <div className="led active"></div>
            </div>
            <div className="result-value-container">
              <Jack active={analysisComplete} color="var(--cable-yellow)" />
              <p className="result-value">{formatTime(session.totalTime)}</p>
            </div>
          </div>

          <div className={`result-item ${analysisComplete ? "show" : ""}`}>
            <div className="result-item-header">
              <Bookmark size={16} />
              <h3>Thématique</h3>
              <div className="led active"></div>
            </div>
            <div className="result-value-container">
              <Jack active={analysisComplete} color="var(--cable-blue)" />
              <p className="result-value">{session.theme}</p>
            </div>
          </div>

          <div className={`result-item ${analysisComplete ? "show" : ""}`}>
            <div className="result-item-header">
              <Zap size={16} />
              <h3>Contrainte</h3>
              <div className="led active"></div>
            </div>
            <div className="result-value-container">
              <Jack active={analysisComplete} color="var(--cable-red)" />
              <p className="result-value">{session.constraint}</p>
            </div>
          </div>
        </div>
      </ModulePanel>

      <div className="result-action">
        <ModuleButton
          onClick={onBackToHome}
          className="new-session-button w-full"
        >
          Générer une nouvelle session
        </ModuleButton>
      </div>
    </div>
  );
};

export default ResultPage;
