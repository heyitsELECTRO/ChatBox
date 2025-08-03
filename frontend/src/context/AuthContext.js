import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import API, { setAuthToken } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, username: decoded.username, unreadCount: decoded.unreadCount || 0 });
      } catch {
        setAuthToken(null);
      }
    }
  }, []);

  const login = async (username, password) => {
    const { data } = await API.post('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    setAuthToken(data.token);
    setUser({ ...data.user, unreadCount: data.unreadCount });
  };

  const signup = async (username, password, confirmPassword, honeypot) => {
    const { data } = await API.post('/auth/signup', { username, password, confirmPassword, honeypot });
    localStorage.setItem('token', data.token);
    setAuthToken(data.token);
    setUser({ ...data.user, unreadCount: data.unreadCount });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
