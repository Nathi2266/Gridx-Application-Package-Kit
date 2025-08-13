// screens/RegisterPage.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styles from '../styles/styles';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function RegisterPage() {
  const { register, loading } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigation();

  const onSubmit = async () => {
    const result = await register({ name, email, password });
    if (result?.success) {
      Alert.alert('Success', 'Registration successful. Please log in.');
      nav.navigate('Login');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Join GridX and start tracking your solar usage</Text>

      <View style={{ width: '100%', marginTop: 20 }}>
        <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.primaryButton} onPress={onSubmit} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Creating...' : 'Sign up'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
