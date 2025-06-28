import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CreditCard as Edit } from 'lucide-react-native';

interface Patient {
  name: string;
  age: number;
  phone: string;
}

interface PatientInfoProps {
  patient: Patient;
  onEdit: () => void;
}

export function PatientInfo({ patient, onEdit }: PatientInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Patient Information</Text>
        <Pressable onPress={onEdit}>
          <Edit size={18} color="#007aff" />
        </Pressable>
      </View>
      <Text style={styles.text}>Name: {patient.name}</Text>
      <Text style={styles.text}>Age: {patient.age}</Text>
      <Text style={styles.text}>Phone: {patient.phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
});