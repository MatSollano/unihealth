import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp } from 'lucide-react-native';

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <LinearGradient
      colors={['#004D80', '#4695EB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {icon && (
        <View style={styles.iconContainer}>
          <TrendingUp size={86} color="#fff" style={styles.icon} />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: 150,
    minHeight: 100,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    fontSize: 14,
    color: '#e0e0e0',
    marginVertical: 4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -16,
  },
  icon: {
    opacity: 0.3,
  },
});