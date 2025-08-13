// screens/DashboardPage.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';
import DashboardCard from '../components/DashboardCard';

export default function DashboardPage({ navigation }) {
  // placeholder metrics
  const metrics = {
    dailyUsage: '4.2 kWh',
    monthSavings: 'R 124.50',
    batteryLevel: '78%',
  };

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.pageTitle}>Dashboard</Text>

      <View style={{ marginTop: 16 }}>
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Daily</Text>
            <Text style={styles.metricValue}>{metrics.dailyUsage}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Savings</Text>
            <Text style={styles.metricValue}>{metrics.monthSavings}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Battery</Text>
            <Text style={styles.metricValue}>{metrics.batteryLevel}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Quick actions</Text>
        <DashboardCard title="Top-up" subtitle="Add energy credits" onPress={() => navigation.navigate('TopUp')} />
        <DashboardCard title="Fault Detection" subtitle="View system faults" onPress={() => navigation.navigate('FaultDetection')} />
        <DashboardCard title="Expenses" subtitle="View spending" onPress={() => navigation.navigate('Expenses')} />
        <DashboardCard title="AI Suggestions" subtitle="How to save energy" onPress={() => navigation.navigate('AISuggestions')} />
      </View>
    </ScrollView>
  );
}
