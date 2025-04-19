import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/fixes.css'
import './styles/button.css'
import './styles/screws.css'
import './styles/result-animation.css'
import './styles/principles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
