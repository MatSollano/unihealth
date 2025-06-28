import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MedicalHistoryCardProps {
  condition: string;
  description: string;
  date: string;
}

export function MedicalHistoryCard({
  condition,
  description,
  date,
}: MedicalHistoryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{condition}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginLeft: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});