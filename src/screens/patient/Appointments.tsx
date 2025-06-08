// screens/AppointmentsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppointmentCard from './Appointments/AppointmentCard';

type Appointment = {
  id: number;
  doctorName: string;
  specialty: string;
  clinic: string;
  address: string;
  date: string;
  time: string;
  status: 'Pending' | 'Ongoing' | 'Completed' | 'Canceled';
  image?: any;
};

const AppointmentsScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Pending' | 'Ongoing' | 'Completed' | 'Canceled'>('All');
  const [loading, setLoading] = useState(false);

  const appointments: Appointment[] = [
    {
      id: 1,
      doctorName: 'Dr. John Garcia',
      specialty: 'Cardiologist',
      clinic: 'Central Medical Center',
      address: '123 UniHealth Ave, Lapu-Lapu City',
      date: 'Dec 15, 2023',
      time: '10:30 AM',
      status: 'Completed',
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      clinic: 'SkinHealth Clinic',
      address: '456 Wellness Blvd, Cebu City',
      date: 'Dec 17, 2023',
      time: '2:00 PM',
      status: 'Canceled',
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Tan',
      specialty: 'Pediatrician',
      clinic: 'Family Care Center',
      address: '789 Healthy St, Mandaue City',
      date: 'Dec 20, 2023',
      time: '9:00 AM',
      status: 'Pending',
    },
    {
      id: 4,
      doctorName: 'Dr. Emily Tan',
      specialty: 'Pediatrician',
      clinic: 'Family Care Center',
      address: '789 Healthy St, Mandaue City',
      date: 'Dec 20, 2023',
      time: '9:00 AM',
      status: 'Pending',
    },
    {
      id: 5,
      doctorName: 'Dr. Emily Tan',
      specialty: 'Pediatrician',
      clinic: 'Family Care Center',
      address: '789 Healthy St, Mandaue City',
      date: 'Dec 20, 2023',
      time: '9:00 AM',
      status: 'Pending',
    },
  ];

  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedFilter === 'All') {
        setFilteredAppointments(appointments);
      } else {
        setFilteredAppointments(appointments.filter((a) => a.status === selectedFilter));
      }
      setLoading(false);
    }, 500); // simulate loading
  }, [selectedFilter]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="add" size={wp('6%')} style={styles.icon} />
          <Ionicons name="notifications-outline" size={wp('6%')} style={styles.icon} />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {['All', 'Pending', 'Ongoing', 'Completed', 'Canceled'].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setSelectedFilter(label as typeof selectedFilter)}
              style={[styles.filterButton, selectedFilter === label && styles.activeFilter]}
            >
              <Text style={[styles.filterText, selectedFilter === label && styles.activeFilterText]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Appointments List */}
      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : filteredAppointments.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredAppointments.map((item) => (
              <AppointmentCard key={item.id} {...item} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No appointments found.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: wp('2%'),
  },
  filterWrapper: {
    height: hp('6%'),
    justifyContent: 'center',
  },
  filtersContent: {
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    backgroundColor: '#E5E7EB',
    marginRight: wp('3%'),
  },
  activeFilter: {
    backgroundColor: '#0F4C81',
  },
  filterText: {
    fontSize: wp('3.5%'),
    color: '#374151',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  scrollContainer: {
    paddingBottom: hp('10%'),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: wp('4%'),
    color: '#9CA3AF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppointmentsScreen;
