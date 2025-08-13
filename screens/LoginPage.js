// screens/LoginPage.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigation();

  const onSubmit = async () => {
    const result = await login({ email, password });
    if (result?.success) {
      Alert.alert('Success', 'Login successful.');
      nav.navigate('Main');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to access your GridX dashboard</Text>

      <View style={{ width: '100%', marginTop: 24 }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={onSubmit} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Signing in...' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', marginTop: 12 }} onPress={() => nav.navigate('Register')}>
          <Text style={styles.linkText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
