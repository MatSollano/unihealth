import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AppointmentCardProps {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctor,
  specialty,
  date,
  time,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{doctor}</Text>
      <Text style={styles.subtitle}>{specialty}</Text>
      <Text style={styles.detail}>{date}</Text>
      <Text style={styles.detail}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: '#F0F4FF',
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
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  detail: {
    fontSize: 12,
    color: '#666',
  },
});

export default AppointmentCard;
