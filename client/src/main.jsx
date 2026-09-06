import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Self-hosted fonts (bundled via npm, not loaded from Google's CDN) so the
// kiosk display still looks right even if the restaurant's WiFi drops.
import '@fontsource/permanent-marker'
import '@fontsource/kalam/400.css'
import '@fontsource/kalam/700.css'

import './styles/global.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
