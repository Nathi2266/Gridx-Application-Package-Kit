import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';
import { AuthContext } from '../contexts/AuthContext';
import { topUp } from '../api';

export default function TopUpScreen() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, token } = useContext(AuthContext); // Destructure token here
  const navigation = useNavigation();

  const handleTopUp = async () => {
    setError('');
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    if (!user || !user.id || !token) {
      setError('User not logged in or token missing.');
      Alert.alert('Error', 'User not logged in or token missing. Please log in again.');
      return;
    }

    setLoading(true);
    try {
      const response = await topUp({
        userId: user.id,
        amount: parseFloat(amount),
        method: paymentMethod,
        token: token, // Pass the token received from AuthContext
      });

      if (response.success) {
        Alert.alert('Success', 'Top-up successful!');
        navigation.navigate('Success');
      } else {
        setError(response.error || 'Top-up failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Top-up</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Credits</Text>

        {error ? <Text style={localStyles.errorText}>{error}</Text> : null}

        <TextInput
          style={[styles.input, localStyles.inputMargin]}
          placeholder="Enter amount (e.g., 50.00)"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={localStyles.label}>Select Payment Method:</Text>
        <View style={localStyles.pickerContainer}>
          <Picker
            selectedValue={paymentMethod}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            style={localStyles.picker}
          >
            <Picker.Item label="Card" value="Card" />
            <Picker.Item label="Mobile Money" value="Mobile Money" />
            <Picker.Item label="Bank Transfer" value="Bank Transfer" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, localStyles.topUpButton]}
          onPress={handleTopUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0B3D91" />
          ) : (
            <Text style={styles.primaryButtonText}>Top Up Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputMargin: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  topUpButton: {
    marginTop: 20,
  },
});
