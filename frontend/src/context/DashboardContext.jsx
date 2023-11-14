import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

/**
 * 
 * @param {*} param0 
 * @returns 
 * Cntext file for dashboard to implement automatic dashboard reload upon change
 */
export function DashboardProvider({ children }) {
  const [reloadDashboard, setReloadDashboard] = useState(false);

  const triggerDashboardUpdate = () => setReloadDashboard((prev) => !prev);

  return (
    <DashboardContext.Provider value={{ reloadDashboard, triggerDashboardUpdate }}>
      {children}
    </DashboardContext.Provider>
  );
}

DashboardProvider.propTypes = {
    children: PropTypes.object,
}