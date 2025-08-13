// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {id, name, email}
  const [token, setToken] = useState(null); // New state for authentication token
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: load persisted auth (SecureStore / AsyncStorage)
    // if a token is found, validate it and set user/token
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      // TODO: replace with real API call that returns a token
      if (!email || !password) throw new Error('Email and password required');
      // mock success with a dummy token
      const mockUser = { id: 'u1', name: 'GridX User', email };
      const dummyToken = 'dummy-auth-token-after-login'; // Replace with actual token from backend
      setUser(mockUser);
      setToken(dummyToken);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      Alert.alert('Login failed', err.message || 'Unknown error');
      return { success: false, error: err };
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      // TODO: replace with API call to create user and get a token
      if (!email || !password || !name) throw new Error('Please fill all fields');
      const mockUser = { id: 'u2', name, email };
      const dummyToken = 'dummy-auth-token-after-registration'; // Replace with actual token from backend
      setUser(mockUser);
      setToken(dummyToken);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      Alert.alert('Registration failed', err.message || 'Unknown error');
      return { success: false, error: err };
    }
  };

  const logout = () => {
    // TODO: clear persisted tokens and user data
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
