/**
 * Authentication context for admin users.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminAuthAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await adminAuthAPI.verify();
      setUser(data.user);
    } catch {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const login = async (email, password) => {
    const { data } = await adminAuthAPI.login({ email, password });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    const refresh = localStorage.getItem('refresh_token');
    try {
      await adminAuthAPI.logout(refresh);
    } catch {
      // Ignore logout errors
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
