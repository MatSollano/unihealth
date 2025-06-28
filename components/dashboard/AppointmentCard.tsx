import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  imageUrl: string;
}

export function AppointmentCard({ doctorName, specialty, date, time, imageUrl }: AppointmentCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.doctorImage} />
      <View style={styles.content}>
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
        <View style={styles.timeInfo}>
          <View style={styles.timeItem}>
            <Calendar size={16} color="#6B7280" />
            <Text style={styles.timeText}>{date}</Text>
          </View>
          <View style={styles.timeItem}>
            <Clock size={16} color="#6B7280" />
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
  doctorName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  timeInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
});