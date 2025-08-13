// App.js
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import AppStack from './navigation/AppStack';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';

function InnerApp() {
  const { theme, navigationTheme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <AppStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
