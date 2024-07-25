import React, { createContext, useState, useEffect } from 'react';
import { isExpired } from 'react-jwt';

import { loginUser, getUser, updateUser } from '../features/User-feature/api/api';

export const UserAuthContext = createContext(null);

export const UserProvider = ({ children }) => {
  const tokenStatus = isExpired(localStorage.getItem('login'));
  const [user, setUser] = useState(null);
  const [isChangeFaild, setIsChangeFaildd] = useState(false);

  useEffect(() => {
    async function login() {
      const user = await getCurrentUser();
      const set = await setCurrentUser(user);
      return set;
    }
    if (!tokenStatus) {
      login();
    }
  }, []);

  const login = async (data) => {
    try {
      const userData = await loginUser(data);
      if (userData) {
        setUser(() => userData.user);
        const token = userData.user.token;
        localStorage.setItem('login', token);
        return userData.user;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const setCurrentUser = async (data) => {
    setUser(() => data);
  };

  const getCurrentUser = async () => {
    try {
      const userData = await getUser();
      return userData.user;
    } catch (err) {
      throw new Error(err);
    }
  };

  const changeUser = async (data) => {
    try {
      const userData = await updateUser(data);
      if (userData) {
        setUser(() => userData.user);
        return userData.user;
      }
    } catch (err) {
      setIsChangeFaildd(() => true);
      return { status: false, message: err.message };
    }
  };

  const logOut = () => {
    localStorage.clear('login');
    setUser(() => null);
  };

  const value = {
    user,
    tokenStatus,
    isChangeFaild,
    logOut,
    login,
    getCurrentUser,
    setCurrentUser,
    changeUser,
    setIsChangeFaildd,
  };
  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
};
