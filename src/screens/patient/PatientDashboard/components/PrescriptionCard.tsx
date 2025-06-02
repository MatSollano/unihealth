import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PrescriptionCardProps {
  doctor: string;
  medicine: string;
  dosage: string;
  dateIssued: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  doctor,
  medicine,
  dosage,
  dateIssued,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{medicine}</Text>
      <Text style={styles.subtitle}>{dosage}</Text>
      <Text style={styles.info}>Prescribed by: {doctor}</Text>
      <Text style={styles.info}>Date: {dateIssued}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    marginVertical: 2,
    marginLeft: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  info: {
    fontSize: 12,
    color: '#777',
  },
});

export default PrescriptionCard;
