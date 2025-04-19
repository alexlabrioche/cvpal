import React from 'react'
import type { GameSession } from '../store/use-game-store'
import { formatTime } from '../lib/utils'

interface ResultPageProps {
  session: GameSession
  onBackToHome: () => void
}

const ResultPage: React.FC<ResultPageProps> = ({ session, onBackToHome }) => {
  return (
    <div className="result-page">
      <div className="result-content">
        <h1 className="title">Votre session</h1>
        
        <div className="result-card">
          <div className="result-item">
            <h3>Joueurs</h3>
            <p>{session.playerCount}</p>
          </div>
          
          <div className="result-item">
            <h3>Temps total</h3>
            <p>{formatTime(session.totalTime)}</p>
          </div>
          
          <div className="result-item">
            <h3>Thématique</h3>
            <p>{session.theme}</p>
          </div>
          
          <div className="result-item">
            <h3>Contrainte</h3>
            <p>{session.constraint}</p>
          </div>
        </div>
        
        <div className="button-container">
          <button 
            className="back-button"
            onClick={onBackToHome}
          >
            Nouvelle session
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
