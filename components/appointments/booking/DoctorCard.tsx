import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  if (!doctor) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <Text style={styles.experience}>{doctor.experience}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    margin: 16,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  specialty: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  experience: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});