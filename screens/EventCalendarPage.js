// screens/EventCalendarPage.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles/styles';

const events = [
  { id: 'ev1', date: '2025-08-01', title: 'Community solar workshop' },
  { id: 'ev2', date: '2025-08-12', title: 'Scheduled maintenance' },
];

export default function EventCalendarPage() {
  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Events & Calendar</Text>
      <FlatList
        data={events}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.small}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}
