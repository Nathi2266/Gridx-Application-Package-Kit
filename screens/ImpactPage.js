import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ImpactPage = () => {
  return (
    <View style={styles.container}>
      <Text>Impact Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImpactPage;
