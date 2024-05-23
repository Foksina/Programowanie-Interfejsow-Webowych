// src/Data/userService.js
import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged, signOut } from './init';

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export const logout = () => {
  signOut(auth);
};
