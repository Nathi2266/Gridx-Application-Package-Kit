// screens/ExpensesPage.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles/styles';
import ExpenseItem from '../components/ExpenseItem';

const sample = [
  { id: 'e1', date: '2025-07-30', amount: 120.0, category: 'Top-up' },
  { id: 'e2', date: '2025-07-22', amount: 45.5, category: 'Maintenance' },
  { id: 'e3', date: '2025-07-03', amount: 89.9, category: 'Replacement' },
];

export default function ExpensesPage() {
  const total = sample.reduce((s, i) => s + i.amount, 0).toFixed(2);
  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Expenses</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>This month</Text>
        <Text style={styles.metricValue}>R {total}</Text>
      </View>

      <FlatList
        data={sample}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}
