import React, { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export function DashboardProvider({ children }) {
  const [reloadDashboard, setReloadDashboard] = useState(false);

  const triggerDashboardUpdate = () => setReloadDashboard((prev) => !prev);

  return (
    <DashboardContext.Provider value={{ reloadDashboard, triggerDashboardUpdate }}>
      {children}
    </DashboardContext.Provider>
  );
}