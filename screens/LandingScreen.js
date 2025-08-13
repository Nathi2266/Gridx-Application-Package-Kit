// screens/LandingScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

export default function LandingScreen() {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/GridX-IMG.jpg')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>GridX</Text>
      <Text style={styles.subtitle}>
        Monitor solar energy, top-up credits, and see community impact — all in one place.
      </Text>

      <View style={{ width: '100%', marginTop: 30 }}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => nav.navigate('Register')}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ghostButton} onPress={() => nav.navigate('Login')}>
          <Text style={styles.ghostButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
