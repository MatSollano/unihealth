import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  gradient: string[];
}

export function StatCard({ title, value, unit, icon, gradient }: StatCardProps) {
  return (
    <LinearGradient colors={gradient} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#fff',
    opacity: 0.9,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  unit: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#fff',
    opacity: 0.8,
    marginLeft: 4,
  },
});