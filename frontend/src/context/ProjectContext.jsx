import React, { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

/*
* Context file for project page to implement automatic project page reload upon change
*/
export function ProjectProvider({ children }) {
  const [reloadProject, setReloadProject] = useState(false);

  const triggerProjectUpdate = () => setReloadProject((prev) => !prev);

  return (
    <ProjectContext.Provider value={{ reloadProject, triggerProjectUpdate }}>
      {children}
    </ProjectContext.Provider>
  );
}