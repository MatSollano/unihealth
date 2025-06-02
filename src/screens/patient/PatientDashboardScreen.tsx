import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import StatCard from './PatientDashboard/components/StatCard';
import QuickActionItem from './PatientDashboard/components/QuickActionItem';
import PrescriptionCard from './PatientDashboard/components/PrescriptionCard';
import AppointmentCard from './PatientDashboard/components/AppointmentCard';
import MedicalHistoryCard from './PatientDashboard/components/MedicalHistoryCard';

import { prescriptions } from './PatientDashboard/data/mockPrescriptions';
import { appointments } from './PatientDashboard/data/mockAppointments';
import { medicalHistory } from './PatientDashboard/data/mockMedicalHistory';

export default function PatientDashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Welcome!</Text>

      {/* Stats */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.sectionRow}>
          <StatCard label="Appointments" value="2" icon="calendar-outline" />
          <StatCard label="Prescriptions" value="5" icon="medkit-outline" />
          <StatCard label="Records" value="12" icon="document-text-outline" />
        </View>
      </ScrollView>

      {/* Quick Actions */}
      {/* <Text style={styles.sectionTitle}>Quick Actions</Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.quickActionsRow}>
          <QuickActionItem label="Medical History" icon="flask-outline" />
          <QuickActionItem label="Scan QR" icon="qr-code-outline" onPress={() => console.log('Pressed')} />
        </View>
      </ScrollView>

      {/* Prescriptions */}
      <Text style={styles.sectionTitle}>Prescriptions</Text>
      <View style={styles.prescriptionsRow}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {prescriptions.map((item, index) => (
            <PrescriptionCard key={index} {...item} />
          ))}
        </ScrollView>
      </View>

      {/* Appointments */}
      <Text style={styles.sectionTitle}>Appointments</Text>
      <View style={styles.appointmentsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {appointments.map((item, index) => (
              <AppointmentCard key={index} {...item} />
            ))}
          </ScrollView>
      </View>

      {/* Medical History */}
      <Text style={styles.sectionTitle}>Medical History</Text>
      <View style={styles.medicalHistoryRow}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {medicalHistory.map((item, index) => (
            <MedicalHistoryCard key={index} {...item} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  quickActionsRow: {
    paddingHorizontal: 4,
  },
  prescriptionsRow: {
    paddingHorizontal: 4,
  },
  appointmentsRow: {
    paddingHorizontal: 4,
  },
  medicalHistoryRow: {
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 24,
    marginVertical: 12,
  },
});
