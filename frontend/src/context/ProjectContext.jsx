import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

/**
 * 
 * @param {*} param0 
 * @returns 
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

ProjectProvider.propTypes = {
    children: PropTypes.object,
}