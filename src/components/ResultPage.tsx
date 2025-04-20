import React, { useState, useEffect } from "react";
import { Cpu, Clock, Zap, Bookmark, Timer } from "lucide-react";
import type { GameSession } from "../store/use-game-store";
import { formatTime } from "../lib/utils";
import ModulePanel from "./modular-ui/ModulePanel";
import ModuleButton from "./modular-ui/ModuleButton";
import Jack from "./modular-ui/Jack";

interface ResultPageProps {
  session: GameSession;
  onBackToHome: () => void;
  onRegenerateSession: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ session, onBackToHome }) => {
  // État pour l'animation d'analyse
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [gridItems, setGridItems] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // État pour le countdown
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [countdownTime, setCountdownTime] = useState(session.totalTime * 60); // Conversion en secondes
  const [countdownIntervalId, setCountdownIntervalId] = useState<number | null>(
    null
  );
  const [isFinished, setIsFinished] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

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

  // Cleanup the interval when component unmounts
  useEffect(() => {
    return () => {
      if (countdownIntervalId !== null) {
        window.clearInterval(countdownIntervalId);
      }
    };
  }, [countdownIntervalId]);

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
          <div className="result-row">
            <div className={`result-item ${analysisComplete ? "show" : ""}`}>
              <div className="result-item-header">
                <Cpu size={16} />
                <h5>Joueurs</h5>
              </div>
              <div className="result-value-container">
                <p className="result-value">{session.playerCount}</p>
              </div>
            </div>

            <div className={`result-item ${analysisComplete ? "show" : ""}`}>
              <div className="result-item-header">
                <Clock size={16} />
                <h5>Total</h5>
              </div>
              <div className="result-value-container">
                <p className="result-value">{formatTime(session.totalTime)}</p>
              </div>
            </div>
          </div>

          <div className={`result-item ${analysisComplete ? "show" : ""}`}>
            <div className="result-item-header">
              <Bookmark size={16} />
              <h3>Thématique</h3>
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
            </div>
            <div className="result-value-container">
              <Jack active={analysisComplete} color="var(--cable-red)" />
              <p className="result-value">{session.constraint}</p>
            </div>
          </div>
        </div>
      </ModulePanel>

      <ModulePanel
        title="Timer"
        className={`result-module ${analysisComplete ? "show" : ""} ${
          showPulse ? "pulse-effect" : ""
        }`}
      >
        {analysisComplete && (
          <div className="countdown-display">
            <div
              className="countdown-value-container"
              onClick={() => {
                if (isCountdownRunning) {
                  // Arrêter le countdown
                  if (countdownIntervalId !== null) {
                    window.clearInterval(countdownIntervalId);
                    setCountdownIntervalId(null);
                  }
                  setIsCountdownRunning(false);
                } else {
                  // Démarrer le countdown
                  const intervalId = window.setInterval(() => {
                    setCountdownTime((prevTime) => {
                      if (prevTime <= 1) {
                        window.clearInterval(intervalId);
                        setCountdownIntervalId(null);
                        setIsCountdownRunning(false);
                        setIsFinished(true);
                        setShowPulse(true);

                        // Hide pulse effect after 3 seconds
                        setTimeout(() => {
                          setShowPulse(false);
                        }, 3000);

                        // Play sound when countdown finishes
                        const audioContext = new (window.AudioContext ||
                          (window as any).webkitAudioContext)();

                        // Create an oscillator (alarm sound)
                        const oscillator = audioContext.createOscillator();
                        oscillator.type = "square";
                        oscillator.frequency.setValueAtTime(
                          440,
                          audioContext.currentTime
                        ); // A4 note

                        // Create gain node (volume control)
                        const gainNode = audioContext.createGain();
                        gainNode.gain.setValueAtTime(
                          0,
                          audioContext.currentTime
                        );
                        gainNode.gain.linearRampToValueAtTime(
                          0.5,
                          audioContext.currentTime + 0.1
                        );

                        // Connect the nodes
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);

                        // Start the oscillator
                        oscillator.start();

                        // Pattern: three beeps
                        setTimeout(() => {
                          gainNode.gain.linearRampToValueAtTime(
                            0,
                            audioContext.currentTime + 0.1
                          );
                          setTimeout(() => {
                            gainNode.gain.linearRampToValueAtTime(
                              0.5,
                              audioContext.currentTime + 0.1
                            );
                            setTimeout(() => {
                              gainNode.gain.linearRampToValueAtTime(
                                0,
                                audioContext.currentTime + 0.1
                              );
                              setTimeout(() => {
                                gainNode.gain.linearRampToValueAtTime(
                                  0.5,
                                  audioContext.currentTime + 0.1
                                );
                                setTimeout(() => {
                                  gainNode.gain.linearRampToValueAtTime(
                                    0,
                                    audioContext.currentTime + 0.1
                                  );
                                  setTimeout(() => {
                                    oscillator.stop();
                                  }, 200);
                                }, 200);
                              }, 200);
                            }, 200);
                          }, 200);
                        }, 500);

                        return 0;
                      }
                      return prevTime - 1;
                    });
                  }, 1000);
                  setCountdownIntervalId(intervalId);
                  setIsCountdownRunning(true);
                }
              }}
              color={
                isCountdownRunning ? "var(--led-standby)" : "var(--panel-light)"
              }
            >
              <Jack active={analysisComplete} color="var(--cable-blue)" />
              <div className="countdown-value">
                {isCountdownRunning ? (
                  <div className="countdown-timer">
                    <div className="countdown-time">
                      {Math.floor(countdownTime / 60)
                        .toString()
                        .padStart(2, "0")}
                      :{(countdownTime % 60).toString().padStart(2, "0")}
                    </div>
                  </div>
                ) : isFinished && countdownTime === 0 ? (
                  <div className="countdown-finished">
                    <div className="countdown-time">00:00</div>
                    <div className="countdown-label blink">Temps écoulé!</div>
                  </div>
                ) : (
                  <div className="countdown-ready">
                    <Timer size={24} />
                    <span>Démarrer</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
