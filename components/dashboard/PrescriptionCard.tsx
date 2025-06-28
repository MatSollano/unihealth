import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pill, Clock } from 'lucide-react-native';

interface PrescriptionCardProps {
  medicineName: string;
  dosage: string;
  doctorName: string;
  daysLeft: number;
}

export function PrescriptionCard({ medicineName, dosage, doctorName, daysLeft }: PrescriptionCardProps) {
  const isLowStock = daysLeft <= 7;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconContainer, isLowStock && styles.lowStockIcon]}>
        <Pill size={24} color={isLowStock ? '#EF4444' : '#004D80'} />
      </View>
      <Text style={styles.medicineName}>{medicineName}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.doctorName}>Dr. {doctorName}</Text>
      <View style={styles.daysLeftContainer}>
        <Clock size={14} color={isLowStock ? '#EF4444' : '#6B7280'} />
        <Text style={[styles.daysLeft, isLowStock && styles.lowStockText]}>
          {daysLeft} days left
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  lowStockIcon: {
    backgroundColor: '#FEE2E2',
  },
  medicineName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  dosage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  daysLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  daysLeft: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  lowStockText: {
    color: '#EF4444',
  },
});