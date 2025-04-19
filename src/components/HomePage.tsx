import React from 'react'
import { Settings } from 'lucide-react'

interface HomePageProps {
  onGenerateSession: () => void;
  onOpenSettings: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGenerateSession, onOpenSettings }) => {
  return (
    <div className="home-page">
      <h1 className="title">CV PAL</h1>
      <p className="subtitle">Générateur de sessions modulaires</p>
      
      <div className="main-button-container">
        <button 
          className="generate-button"
          onClick={onGenerateSession}
        >
          Générer une session
        </button>
      </div>
      
      <div className="settings-button-container">
        <button 
          className="settings-button"
          onClick={onOpenSettings}
          aria-label="Ouvrir les paramètres"
        >
          <Settings size={24} />
        </button>
      </div>
    </div>
  )
}

export default HomePage
