import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }) {
  const [reloadProfile, setReloadProfile] = useState(false);

  const triggerProfileUpdate = () => setReloadProfile((prev) => !prev);

  return (
    <ProfileContext.Provider value={{ reloadProfile, triggerProfileUpdate }}>
      {children}
    </ProfileContext.Provider>
  );
}