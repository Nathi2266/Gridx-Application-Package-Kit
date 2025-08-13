// components/FaultVisualization.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function FaultVisualization({ data = [] }) {
  // simple placeholder visual summary
  return (
    <View style={[styles.card, { marginBottom: 12 }]}>
      <Text style={styles.cardTitle}>Fault summary</Text>
      <Text style={styles.small}>{data.length} active issues</Text>
    </View>
  );
}
