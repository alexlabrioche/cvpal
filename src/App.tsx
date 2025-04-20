import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import ResultPage from './components/ResultPage'
import SettingsPage from './components/SettingsPage'
import { useGameStore } from './store/use-game-store'

function App() {
  // Simple page navigation
  const [currentPage, setCurrentPage] = useState<'home' | 'result' | 'settings'>('home')
  
  // Access the store
  const currentSession = useGameStore(state => state.currentSession)
  const generateSession = useGameStore(state => state.generateSession)
  const resetSession = useGameStore(state => state.resetSession)
  
  // Handler for generating a new session
  const handleGenerateSession = () => {
    generateSession()
    setCurrentPage('result')
  }
  
  // Handler for returning to home
  const handleBackToHome = () => {
    resetSession()
    setCurrentPage('home')
  }
  
  // Handler for regenerating a new session
  const handleRegenerateSession = () => {
    generateSession()
    // We stay on the result page
  }
  
  // Handler for navigating to settings
  const handleOpenSettings = () => {
    setCurrentPage('settings')
  }
  
  // Handler for returning from settings
  const handleBackFromSettings = () => {
    setCurrentPage('home')
  }

  return (
    <div className="app-container">
      {currentPage === 'home' && (
        <HomePage 
          onGenerateSession={handleGenerateSession} 
          onOpenSettings={handleOpenSettings}
        />
      )}
      
      {currentPage === 'result' && currentSession && (
        <ResultPage 
          session={currentSession}
          onBackToHome={handleBackToHome}
          onRegenerateSession={handleRegenerateSession}
        />
      )}
      
      {currentPage === 'settings' && (
        <SettingsPage 
          onBack={handleBackFromSettings} 
        />
      )}
    </div>
  )
}

export default App
