import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HeaderProvider } from './HeaderContext.jsx'
import { ProfileProvider } from './ProfileContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeaderProvider>
        <ProfileProvider>
            <App />
        </ProfileProvider>
    </HeaderProvider>
  </StrictMode>,
)
