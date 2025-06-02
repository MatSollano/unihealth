import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type StatCardProps = {
  label: string;
  value: string;
  icon: string;
};

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <LinearGradient
      colors={['#004D80', '#4695EB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Ionicons name={icon as any} size={28} color="#fff" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: 140,
    marginRight: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
});
