import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pill, Clock, User } from 'lucide-react-native';

interface PrescriptionListCardProps {
  id: string;
  medicineName: string;
  dosage: string;
  doctorName: string;
  prescribedDate: string;
  daysLeft: number;
  status: 'active' | 'expired';
  onPress: () => void;
}

export function PrescriptionListCard({
  medicineName,
  dosage,
  doctorName,
  prescribedDate,
  daysLeft,
  status,
  onPress,
}: PrescriptionListCardProps) {
  const isLowStock = daysLeft <= 7 && status === 'active';
  const isExpired = status === 'expired';

  const getStatusColor = () => {
    if (isExpired) return '#EF4444';
    if (isLowStock) return '#F59E0B';
    return '#10B981';
  };

  const getStatusText = () => {
    if (isExpired) return 'Expired';
    if (isLowStock) return 'Low Stock';
    return 'Active';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: isExpired ? '#FEE2E2' : '#E8F0FE' }]}>
          <Pill size={24} color={isExpired ? '#EF4444' : '#004D80'} />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>
      
      <Text style={styles.medicineName}>{medicineName}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      
      <View style={styles.infoRow}>
        <User size={14} color="#6B7280" />
        <Text style={styles.infoText}>{doctorName}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.prescribedDate}>Prescribed: {prescribedDate}</Text>
        {status === 'active' && (
          <View style={styles.daysLeftContainer}>
            <Clock size={14} color={isLowStock ? '#F59E0B' : '#6B7280'} />
            <Text style={[styles.daysLeft, isLowStock && styles.lowStockText]}>
              {daysLeft} days left
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  medicineName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  dosage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prescribedDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
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
    color: '#F59E0B',
  },
});