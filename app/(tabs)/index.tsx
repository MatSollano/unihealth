import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActionItem } from '@/components/dashboard/QuickActionItem';
import { PrescriptionCard } from '@/components/dashboard/PrescriptionCard';
import { AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { MedicalHistoryCard } from '@/components/dashboard/MedicalHistoryCard';
import { mockData } from '@/data/mockData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function DashboardScreen() {
  const { prescriptions, appointments, medicalHistory } = mockData;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Welcome!</Text>

        {/* Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.statsRow}>
            <View style={{ width: wp('2%') }} />
            <StatCard label="Appointments" value="2" icon="trending-up" />
            <View style={styles.verticalStack}>
              <StatCard label="Prescriptions" value="5" />
              <StatCard label="Records" value="12" />
            </View>
          </View>
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          <QuickActionItem label="Medical History" icon="flask" />
          <QuickActionItem label="Scan QR" icon="qr-code" />
        </View>

        {/* Prescriptions */}
        <Text style={styles.sectionTitle}>Prescriptions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalList}>
            {prescriptions.map((item) => (
              <PrescriptionCard key={item.id} {...item} />
            ))}
          </View>
        </ScrollView>

        {/* Appointments */}
        <Text style={styles.sectionTitle}>Appointments</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalList}>
            {appointments.map((item) => (
              <AppointmentCard key={item.id} {...item} />
            ))}
          </View>
        </ScrollView>

        {/* Medical History */}
        <Text style={styles.sectionTitle}>Medical History</Text>
        <View style={styles.medicalHistorySection}>
          {medicalHistory.map((item) => (
            <MedicalHistoryCard key={item.id} {...item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: wp('5%'),
    paddingBottom: hp('10%'),
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  verticalStack: {
    flexDirection: 'column',
    gap: hp('1.5%'),
    paddingHorizontal: wp('3%'),
  },
  quickActionsRow: {
    paddingHorizontal: wp('2%'),
  },
  horizontalList: {
    flexDirection: 'row',
    paddingHorizontal: wp('2%'),
  },
  medicalHistorySection: {
    paddingHorizontal: wp('2%'),
  },
});