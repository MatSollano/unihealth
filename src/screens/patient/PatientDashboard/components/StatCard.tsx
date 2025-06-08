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
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.iconContainer}>
      {icon && (
        <Ionicons name={icon as any} style={{ marginTop: -16 }} size={86} color="#fff" />
      )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    minWidth: 150,
    
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
  //  flex: 1,
   justifyContent: 'center',
  //  alignItems: 'center',
  //  alignContent: 'center',
   alignSelf: 'center',
  },
});
