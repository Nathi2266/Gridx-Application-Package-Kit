// components/DashboardCard.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/styles';

export default function DashboardCard({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.small}>{subtitle}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}
