// screens/AISuggestions.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const initial = [
  { id: '1', text: 'Shift heavy loads to daytime to maximise solar usage', votes: 12 },
  { id: '2', text: 'Lower thermostat by 1°C to save energy', votes: 8 },
  { id: '3', text: 'Use timed charging for devices overnight', votes: 5 },
];

export default function AISuggestions() {
  const [suggestions, setSuggestions] = useState(initial);

  const vote = (id) => {
    setSuggestions((s) => s.map((x) => (x.id === id ? { ...x, votes: x.votes + 1 } : x)));
  };

  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>AI Suggestions</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.text}</Text>
            <View style={styles.row}>
              <Text style={styles.small}>{item.votes} votes</Text>
              <TouchableOpacity onPress={() => vote(item.id)} style={styles.iconButton}>
                <Text style={styles.iconButtonText}>Vote</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
