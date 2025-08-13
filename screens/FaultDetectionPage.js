// screens/FaultDetectionPage.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles/styles';
import FaultDetectionCard from '../components/FaultDetectionCard';
import FaultVisualization from '../components/FaultVisualization';

const faults = [
  { id: 'f1', title: 'Inverter overload', severity: 'high', date: '2025-07-10' },
  { id: 'f2', title: 'Battery voltage drift', severity: 'medium', date: '2025-06-28' },
];

export default function FaultDetectionPage({ navigation }) {
  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Fault Detection</Text>
      <FaultVisualization data={faults} />

      <FlatList
        data={faults}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <FaultDetectionCard
            fault={item}
            onPress={() => navigation.navigate('FaultDetails', { id: item.id })}
          />
        )}
      />
    </View>
  );
}
