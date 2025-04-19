import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getRandomInt, getRandomElement } from "../lib/utils";

// Types
export type Theme = string;
export type Constraint = string;

export interface GameSettings {
  playerCountRange: {
    min: number;
    max: number;
  };
  timeRange: {
    min: number;
    max: number;
  };
  themes: Theme[];
  constraints: Constraint[];
}

export interface GameSession {
  playerCount: number;
  totalTime: number;
  theme: Theme;
  constraint: Constraint;
}

export interface GameState {
  // Settings
  settings: GameSettings;

  // Current session (if active)
  currentSession: GameSession | null;

  // Actions
  generateSession: () => void;
  resetSession: () => void;

  // Settings actions
  updateSettings: (settings: Partial<GameSettings>) => void;
  updatePlayerCountRange: (min: number, max: number) => void;
  updateTimeRange: (min: number, max: number) => void;
  addTheme: (theme: string) => void;
  removeTheme: (theme: string) => void;
  addConstraint: (constraint: string) => void;
  removeConstraint: (constraint: string) => void;
}

// Default values
const DEFAULT_THEMES: Theme[] = [
  "Aquatique",
  "Urbain",
  "Forestier",
  "Somnolent",
  "Inquiétant",
  "Doux",
  "Romantique",
  "Hostile",
  "Chaud",
  "Froid",
  "Secret",
];

const DEFAULT_CONSTRAINTS: Constraint[] = [
  // Rythme
  "Tempo instable/irrégulier",
  "Constante transformation",
  // Dynamique
  "Silence et impacts",
  "À peine perceptible",
  // Tonalité
  "Pas de note",
  "Constance tonale",
  // Technique
  "L'un déclenche l'autre",
  "Un mouvement commun",
  // Répartition
  "Un son par personne",
  "Grave/Moyen/Aigu",
];

// Create the store
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Default settings
      settings: {
        playerCountRange: {
          min: 1,
          max: 4,
        },
        timeRange: {
          min: 2,
          max: 6,
        },
        themes: DEFAULT_THEMES,
        constraints: DEFAULT_CONSTRAINTS,
      },

      // Current session (initially null)
      currentSession: null,

      // Generate a new session based on current settings
      generateSession: () => {
        const { settings } = get();

        // Generate random values
        const playerCount = getRandomInt(
          settings.playerCountRange.min,
          settings.playerCountRange.max
        );

        const timePerPlayer = getRandomInt(
          settings.timeRange.min,
          settings.timeRange.max
        );

        // Calculate total time
        const totalTime = playerCount * timePerPlayer;

        // Select random theme and constraint
        const theme = getRandomElement(settings.themes);
        const constraint = getRandomElement(settings.constraints);

        // Update state
        set({
          currentSession: {
            playerCount,
            totalTime,
            theme,
            constraint,
          },
        });
      },

      // Reset current session
      resetSession: () => {
        set({ currentSession: null });
      },

      // Update settings
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        }));
      },
      
      // Settings specific update functions
      updatePlayerCountRange: (min: number, max: number) => {
        set((state) => ({
          settings: {
            ...state.settings,
            playerCountRange: { min, max },
          },
        }));
      },
      
      updateTimeRange: (min: number, max: number) => {
        set((state) => ({
          settings: {
            ...state.settings,
            timeRange: { min, max },
          },
        }));
      },
      
      addTheme: (theme: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            themes: [...state.settings.themes, theme],
          },
        }));
      },
      
      removeTheme: (theme: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            themes: state.settings.themes.filter((t) => t !== theme),
          },
        }));
      },
      
      addConstraint: (constraint: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            constraints: [...state.settings.constraints, constraint],
          },
        }));
      },
      
      removeConstraint: (constraint: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            constraints: state.settings.constraints.filter((c) => c !== constraint),
          },
        }));
      },
    }),
    {
      name: "cvpal-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
