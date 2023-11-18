import React, { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const useHeader = () => useContext(HeaderContext);

/*
* Context file for Header to implement automatic header reload upon change
*/
export function HeaderProvider({ children }) {
  const [reloadHeader, setReloadHeader] = useState(false);

  const triggerHeaderUpdate = () => setReloadHeader((prev) => !prev);

  return (
    <HeaderContext.Provider value={{ reloadHeader, triggerHeaderUpdate }}>
      {children}
    </HeaderContext.Provider>
  );
}