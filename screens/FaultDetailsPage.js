// screens/FaultDetailsPage.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function FaultDetailsPage({ route }) {
  const { id } = route.params || {};
  // TODO: fetch details by id
  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Fault Details</Text>
      <Text style={{ marginTop: 10 }}>Showing details for fault ID: {id}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Inverter overload</Text>
        <Text style={styles.small}>Severity: High</Text>
        <Text style={styles.small}>Detected: 2025-07-10</Text>
        <Text style={{ marginTop: 12 }}>Suggested action: Reduce load and inspect inverter wiring.</Text>
      </View>
    </View>
  );
}
