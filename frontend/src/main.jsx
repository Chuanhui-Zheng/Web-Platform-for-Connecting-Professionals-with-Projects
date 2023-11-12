import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HeaderProvider } from './context/HeaderContext.jsx'
import { ProfileProvider } from './context/ProfileContext.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'
import { DashboardProvider } from './context/DashboardContext.jsx'

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
