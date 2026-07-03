import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'
import CursorGlow from './components/CursorGlow.tsx'
import { LanguageProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <LanguageProvider>
      <SmoothScroll>
        <App />
        <CursorGlow />
      </SmoothScroll>
    </LanguageProvider>
  </HashRouter>,
)
