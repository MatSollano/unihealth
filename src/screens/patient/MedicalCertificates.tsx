import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MedicalCertificates() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Certificates</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8FF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
});
