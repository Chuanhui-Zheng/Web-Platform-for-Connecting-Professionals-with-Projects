import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

/**
 * 
 * @param {*} param0 
 * @returns 
 * Context file for profile to implement automatic profile reload upon change
 */
export function ProfileProvider({ children }) {
  const [reloadProfile, setReloadProfile] = useState(false);

  const triggerProfileUpdate = () => setReloadProfile((prev) => !prev);

  return (
    <ProfileContext.Provider value={{ reloadProfile, triggerProfileUpdate }}>
      {children}
    </ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
    children: PropTypes.object,
}