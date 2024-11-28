import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global/global.css'
import { RideProvider } from './contexts/Ride.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RideProvider>
        <App />
      </RideProvider>
  </StrictMode>,
)
