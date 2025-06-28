import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Bell } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { RatingModal } from '@/components/appointments/RatingModal';
import { mockData } from '@/data/mockData';

type FilterType = 'All' | 'Pending' | 'Ongoing' | 'Completed' | 'Canceled';

export default function AppointmentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const { appointments } = mockData;
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedFilter === 'All') {
        setFilteredAppointments(appointments);
      } else {
        setFilteredAppointments(appointments.filter((a) => a.status === selectedFilter));
      }
      setLoading(false);
    }, 300);
  }, [selectedFilter]);

  const handleRate = (doctorName: string) => {
    setSelectedDoctor(doctorName);
    setModalVisible(true);
  };

  const handleRatingSubmit = (rating: number, tags: string[], comment: string) => {
    console.log('Rating submitted:', { doctor: selectedDoctor, rating, tags, comment });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/appointments/book')}>
            <Plus size={wp('6%')} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={wp('6%')} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
          {(['All', 'Pending', 'Ongoing', 'Completed', 'Canceled'] as FilterType[]).map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setSelectedFilter(label)}
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
              <AppointmentCard key={item.id} {...item} onRatePress={() => handleRate(item.doctorName)} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No appointments found.</Text>
          </View>
        )}
      </View>

      <RatingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        doctorName={selectedDoctor}
        onSubmit={handleRatingSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: wp('5%') },
  headerTitle: { fontSize: wp('6%'), fontWeight: '600' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: wp('4%') },
  filterWrapper: { height: hp('6%'), justifyContent: 'center' },
  filtersContent: { paddingHorizontal: wp('5%'), alignItems: 'center' },
  filterButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    backgroundColor: '#E5E7EB',
    marginRight: wp('3%'),
  },
  activeFilter: { backgroundColor: '#0F4C81' },
  filterText: { fontSize: wp('3.5%'), color: '#374151' },
  activeFilterText: { color: '#fff', fontWeight: '500' },
  listContainer: { flex: 1, paddingHorizontal: wp('5%'), paddingVertical: hp('1%') },
  scrollContainer: { paddingBottom: hp('10%'), marginTop: hp('0.5%') },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: wp('4%'), color: '#9CA3AF' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});