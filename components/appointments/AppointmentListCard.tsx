import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock, MapPin } from 'lucide-react-native';

interface AppointmentListCardProps {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  imageUrl: string;
  onPress: () => void;
}

export function AppointmentListCard({
  doctorName,
  specialty,
  clinic,
  date,
  time,
  status,
  imageUrl,
  onPress,
}: AppointmentListCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming':
        return '#10B981';
      case 'completed':
        return '#6B7280';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.doctorImage} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <Text style={styles.specialty}>{specialty}</Text>
        <View style={styles.infoRow}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.infoText}>{clinic}</Text>
        </View>
        <View style={styles.timeRow}>
          <View style={styles.timeItem}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.timeText}>{date}</Text>
          </View>
          <View style={styles.timeItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
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
  specialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
});