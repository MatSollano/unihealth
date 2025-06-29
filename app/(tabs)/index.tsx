import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Bell, Calendar, FileText, Activity, Heart, Plus } from 'lucide-react-native';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { PrescriptionCard } from '@/components/dashboard/PrescriptionCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuthStore } from '@/store/authStore';
import { useHealthStore } from '@/store/healthStore';
import { useResponsive } from '@/hooks/useResponsive';
import { subscribeToHealthData, subscribeToAppointments } from '@/services/firebaseService';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '@/constants/theme';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { 
    healthData, 
    appointments, 
    setHealthData, 
    setAppointments, 
    loading, 
    error,
    setLoading,
    setError 
  } = useHealthStore();
  const { isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    if (user) {
      setLoading('healthData', true);
      setLoading('appointments', true);

      // Subscribe to real-time health data
      const unsubscribeHealth = subscribeToHealthData(user.uid, (data) => {
        if (data) {
          setHealthData(data);
        }
        setLoading('healthData', false);
      });

      // Subscribe to real-time appointments
      const unsubscribeAppointments = subscribeToAppointments(user.uid, (data) => {
        setAppointments(data);
        setLoading('appointments', false);
      });

      return () => {
        unsubscribeHealth();
        unsubscribeAppointments();
      };
    }
  }, [user]);

  const upcomingAppointment = appointments.find(apt => apt.status === 'upcoming');
  const isLoading = loading.healthData || loading.appointments;

  const handleBookAppointment = () => {
    router.push('/(tabs)/appointments/book');
  };

  const handleViewPrescriptions = () => {
    router.push('/(tabs)/prescriptions');
  };

  const handleViewAppointments = () => {
    router.push('/(tabs)/appointments');
  };

  const handleViewAllPrescriptions = () => {
    router.push('/(tabs)/prescriptions');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

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
            <Bell size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Health Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          {error.healthData ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error.healthData}</Text>
            </View>
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.statsContainer}
              contentContainerStyle={styles.statsContent}
            >
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
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={[
            styles.quickActionsGrid,
            { 
              flexDirection: isTablet ? 'row' : 'row',
              flexWrap: isTablet ? 'wrap' : 'nowrap',
              gap: isTablet ? Spacing.lg : Spacing.md,
            }
          ]}>
            <QuickActionCard
              title="Book Appointment"
              subtitle="Schedule with doctor"
              icon={<Calendar size={24} color={Colors.primary} />}
              onPress={handleBookAppointment}
            />
            <QuickActionCard
              title="View Prescriptions"
              subtitle="Check medications"
              icon={<FileText size={24} color={Colors.primary} />}
              onPress={handleViewPrescriptions}
            />
            {isTablet && (
              <>
                <QuickActionCard
                  title="Health Records"
                  subtitle="View medical history"
                  icon={<Activity size={24} color={Colors.primary} />}
                  onPress={() => {}}
                />
                <QuickActionCard
                  title="Emergency"
                  subtitle="Quick access"
                  icon={<Plus size={24} color={Colors.primary} />}
                  onPress={() => {}}
                />
              </>
            )}
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={handleViewAppointments}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {error.appointments ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error.appointments}</Text>
            </View>
          ) : upcomingAppointment ? (
            <AppointmentCard
              doctorName={upcomingAppointment.doctorName}
              specialty={upcomingAppointment.specialty}
              date={upcomingAppointment.date}
              time={upcomingAppointment.time}
              imageUrl={upcomingAppointment.imageUrl}
            />
          ) : (
            <EmptyState
              icon={<Calendar size={48} color={Colors.textTertiary} />}
              title="No upcoming appointments"
              description="Schedule your next appointment to stay on top of your health"
              actionText="Book Appointment"
              onAction={handleBookAppointment}
            />
          )}
        </View>

        {/* Recent Prescriptions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
            <TouchableOpacity onPress={handleViewAllPrescriptions}>
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
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  greeting: {
    fontSize: FontSizes.md,
    fontFamily: 'Inter-Regular',
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Inter-Bold',
    color: Colors.textPrimary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  statsContainer: {
    marginHorizontal: -Spacing.xl,
  },
  statsContent: {
    paddingHorizontal: Spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  errorContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.md,
  },
  errorText: {
    fontSize: FontSizes.md,
    fontFamily: 'Inter-Regular',
    color: Colors.error,
    textAlign: 'center',
  },
});