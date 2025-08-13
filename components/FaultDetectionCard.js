// components/FaultDetectionCard.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/styles';

export default function FaultDetectionCard({ fault, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{fault.title}</Text>
      <Text style={styles.small}>Severity: {fault.severity}</Text>
      <Text style={styles.small}>Detected: {fault.date}</Text>
    </TouchableOpacity>
  );
}
