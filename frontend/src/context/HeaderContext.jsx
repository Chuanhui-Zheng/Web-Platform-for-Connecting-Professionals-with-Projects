import React, { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const useHeader = () => useContext(HeaderContext);

export function HeaderProvider({ children }) {
  const [reloadHeader, setReloadHeader] = useState(false);

  const triggerHeaderUpdate = () => setReloadHeader((prev) => !prev);

  return (
    <HeaderContext.Provider value={{ reloadHeader, triggerHeaderUpdate }}>
      {children}
    </HeaderContext.Provider>
  );
}