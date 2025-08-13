// components/ExpenseItem.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function ExpenseItem({ item }) {
  return (
    <View style={[styles.row, styles.listItem]}>
      <View>
        <Text style={styles.cardTitle}>{item.category}</Text>
        <Text style={styles.small}>{item.date}</Text>
      </View>
      <Text style={styles.metricValue}>R {item.amount.toFixed(2)}</Text>
    </View>
  );
}
