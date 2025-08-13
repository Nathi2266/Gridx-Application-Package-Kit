// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persisting token
import { loginUser, registerUser } from '../api'; // Assuming registerUser will also be in api.js

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {id, name, email}
  const [token, setToken] = useState(null); // New state for authentication token
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          // TODO: Optionally, validate token with backend or decode user info from it
          // For now, assume a valid token means a logged-in user
          // You might need to fetch user details from an /api/me endpoint
          setUser({ id: 'unknown', email: 'unknown' }); // Placeholder
        }
      } catch (error) {
        console.error('Failed to load auth data from storage', error);
      }
    };
    loadAuthData();
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        const { token } = response;
        await AsyncStorage.setItem('userToken', token);
        setToken(token);
        // Decode user info from token or fetch from a /me endpoint if needed
        setUser({ id: 'temp_id', email: email }); // Placeholder
        setLoading(false);
        return { success: true };
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Login failed', err.message || 'Unknown error');
      return { success: false, error: err };
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const response = await registerUser({ full_name: name, email, password }); // Assuming registerUser takes full_name
      if (response.success) {
        // After successful registration, you might automatically log them in
        // Or, if your register endpoint returns a token, you can use that
        // For now, we'll assume a separate login step is needed or the register returns a token.
        const { token, user_id } = response.data; // Assuming your register returns token and user_id
        await AsyncStorage.setItem('userToken', token);
        setToken(token);
        setUser({ id: user_id, name, email });
        setLoading(false);
        return { success: true };
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Registration failed', err.message || 'Unknown error');
      return { success: false, error: err };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Failed to clear auth data from storage', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
