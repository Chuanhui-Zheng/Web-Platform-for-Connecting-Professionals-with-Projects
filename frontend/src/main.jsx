import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HeaderProvider } from './HeaderContext.jsx'
import { ProfileProvider } from './ProfileContext.jsx'
import { ProjectProvider } from './ProjectContext.jsx'
import { DashboardProvider } from './DashboardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeaderProvider>
        <ProfileProvider>
            <DashboardProvider>
                <ProjectProvider>
                    <App />
                </ProjectProvider>
            </DashboardProvider>
        </ProfileProvider>
    </HeaderProvider>
  </StrictMode>,
)
