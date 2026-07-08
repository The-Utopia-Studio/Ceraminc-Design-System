import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyThemeId, readStoredThemeId } from './theme'
import { App } from './App'
import './styles.css'

applyThemeId(readStoredThemeId())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
