import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

export default function SuccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.successText}>Top-up Successful!</Text>
      <Text style={localStyles.messageText}>Your credits have been added to your account.</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745', // Green color for success
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
});
