import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, FileText, Activity, Heart } from 'lucide-react-native';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { PrescriptionCard } from '@/components/dashboard/PrescriptionCard';
import { useAuthStore } from '@/store/authStore';
import { useHealthStore } from '@/store/healthStore';
import { subscribeToHealthData, subscribeToAppointments } from '@/services/firebaseService';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { healthData, appointments, setHealthData, setAppointments } = useHealthStore();

  useEffect(() => {
    if (user) {
      // Subscribe to real-time health data
      const unsubscribeHealth = subscribeToHealthData(user.uid, (data) => {
        if (data) {
          setHealthData(data);
        }
      });

      // Subscribe to real-time appointments
      const unsubscribeAppointments = subscribeToAppointments(user.uid, (data) => {
        setAppointments(data);
      });

      return () => {
        unsubscribeHealth();
        unsubscribeAppointments();
      };
    }
  }, [user]);

  const upcomingAppointment = appointments.find(apt => apt.status === 'upcoming');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Health Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
            <StatCard
              title="Heart Rate"
              value={healthData.heartRate.toString()}
              unit="bpm"
              icon={<Heart size={24} color="#fff" />}
              gradient={['#EF4444', '#DC2626']}
            />
            <StatCard
              title="Steps Today"
              value={healthData.steps.toLocaleString()}
              unit="steps"
              icon={<Activity size={24} color="#fff" />}
              gradient={['#10B981', '#059669']}
            />
            <StatCard
              title="Sleep"
              value={healthData.sleep.toString()}
              unit="hours"
              icon={<Activity size={24} color="#fff" />}
              gradient={['#8B5CF6', '#7C3AED']}
            />
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              title="Book Appointment"
              subtitle="Schedule with doctor"
              icon={<Calendar size={24} color="#004D80" />}
              onPress={() => {}}
            />
            <QuickActionCard
              title="View Prescriptions"
              subtitle="Check medications"
              icon={<FileText size={24} color="#004D80" />}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingAppointment ? (
            <AppointmentCard
              doctorName={upcomingAppointment.doctorName}
              specialty={upcomingAppointment.specialty}
              date={upcomingAppointment.date}
              time={upcomingAppointment.time}
              imageUrl={upcomingAppointment.imageUrl}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No upcoming appointments</Text>
            </View>
          )}
        </View>

        {/* Recent Prescriptions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <PrescriptionCard
              medicineName="Lisinopril"
              dosage="10mg daily"
              doctorName="Dr. Sarah Johnson"
              daysLeft={15}
            />
            <PrescriptionCard
              medicineName="Metformin"
              dosage="500mg twice daily"
              doctorName="Dr. Michael Chen"
              daysLeft={8}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#004D80',
  },
  statsContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});