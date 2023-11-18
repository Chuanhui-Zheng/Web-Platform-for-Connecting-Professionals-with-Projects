import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const HeaderContext = createContext();

export const useHeader = () => useContext(HeaderContext);

/**
 * 
 * @param {*} param0 
 * @returns 
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

HeaderProvider.propTypes = {
    children: PropTypes.object,
}