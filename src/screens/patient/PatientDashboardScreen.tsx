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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function PatientDashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Welcome!</Text>

      {/* Stats */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.sectionRow}>
          <View style={{ width: wp('2%') }} />
            <StatCard label="Appointments" value="2" icon="trending-up-outline" />
          </View>          
          <View style={styles.verticalStack}>
            <StatCard label="Prescriptions" value="5" />
            <StatCard label="Records" value="12" />
          </View>
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActionsRow}>
        <QuickActionItem label="Medical History" icon="flask-outline" />
        <QuickActionItem label="Scan QR" icon="qr-code-outline" onPress={() => console.log('Pressed')} />
      </View>

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
    backgroundColor: '#FFF',
  },
  content: {
    padding: wp('5%'),
  },
  heading: {
    fontSize: wp('6%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '500',
    marginTop: hp('3%'),
    marginBottom: hp('1.5%'),
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  verticalStack: {
    flexDirection: 'column',
    gap: hp('1.5%'), 
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },  
  quickActionsRow: {
    paddingHorizontal: wp('2%'),
  },
  prescriptionsRow: {
    paddingHorizontal: wp('2%'),
  },
  appointmentsRow: {
    paddingHorizontal: wp('2%'),
  },
  medicalHistoryRow: {
    paddingHorizontal: wp('2%'),
    paddingBottom: hp('4%'),
  },
});
