import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Bell, Search } from 'lucide-react-native';
import { AppointmentListCard } from '@/components/appointments/AppointmentListCard';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { SearchBar } from '@/components/ui/SearchBar';

const mockAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    clinic: 'Heart Care Center',
    date: 'Today',
    time: '2:30 PM',
    status: 'upcoming' as const,
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Endocrinologist',
    clinic: 'Diabetes Care Clinic',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: 'upcoming' as const,
    imageUrl: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    clinic: 'Skin Health Center',
    date: 'Dec 15',
    time: '3:00 PM',
    status: 'completed' as const,
    imageUrl: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const filterOptions = ['All', 'Upcoming', 'Completed', 'Cancelled'];

export default function AppointmentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesFilter = selectedFilter === 'All' || 
      appointment.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch = appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Plus size={24} color="#004D80" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bell size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search appointments..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <FilterTabs
        options={filterOptions}
        selectedOption={selectedFilter}
        onSelect={setSelectedFilter}
      />

      {/* Appointments List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.appointmentsList}>
          {filteredAppointments.map((appointment) => (
            <AppointmentListCard
              key={appointment.id}
              {...appointment}
              onPress={() => {}}
            />
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  appointmentsList: {
    padding: 20,
    gap: 12,
  },
});