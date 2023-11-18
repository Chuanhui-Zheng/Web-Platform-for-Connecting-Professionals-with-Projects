import React, { createContext, useState, useContext } from 'react';

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