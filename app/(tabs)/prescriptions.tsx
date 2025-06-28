import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, ChevronRight } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mockData } from '@/data/mockData';

const filterTabs = ['All', 'Active', 'Completed', 'Expiring Soon'];

export default function PrescriptionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { prescriptions } = mockData;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Prescriptions</Text>
        <View style={styles.icons}>
          <Bell size={wp('6%')} color="#333" />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={wp('4.5%')} color="#9CA3AF" />
        <TextInput
          placeholder="Search prescriptions"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {filterTabs.map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => setSelectedFilter(label)}
            style={[
              styles.filterButton,
              selectedFilter === label && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === label && styles.activeFilterText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Prescription Cards */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {prescriptions.map((prescription) => (
          <View key={prescription.id} style={styles.card}>
            <Text style={styles.medName}>{prescription.medicine}</Text>
            <Text style={styles.dosage}>{prescription.dosage}</Text>
            <View style={styles.doctorRow}>
              <Text style={styles.docName}>{prescription.doctor}</Text>
            </View>
            <Text style={styles.date}>
              Issued: {prescription.dateIssued}
            </Text>
            <ChevronRight
              size={wp('5%')}
              color="#6B7280"
              style={styles.arrowIcon}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '600',
  },
  icons: { flexDirection: 'row', alignItems: 'center' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
  },
  searchInput: {
    marginLeft: wp('2%'),
    fontSize: wp('3.5%'),
    flex: 1,
  },
  filters: {
    marginTop: hp('1.5%'),
    marginBottom: hp('1.5%'),
    paddingHorizontal: wp('5%'),
  },
  filterButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    backgroundColor: '#E5E7EB',
    marginRight: wp('3%'),
  },
  filterText: {
    fontSize: wp('3.5%'),
    color: '#374151',
  },
  activeFilter: {
    backgroundColor: '#0F4C81',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: hp('10%'),
    paddingTop: hp('1%'),
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    borderRadius: wp('3%'),
    padding: wp('4%'),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  medName: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: hp('0.5%'),
  },
  dosage: {
    fontSize: wp('3.5%'),
    color: '#6B7280',
    marginBottom: hp('1%'),
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  docName: {
    fontSize: wp('3.5%'),
    color: '#111827',
  },
  date: {
    fontSize: wp('3%'),
    color: '#6B7280',
  },
  arrowIcon: {
    position: 'absolute',
    right: wp('4%'),
    top: hp('2%'),
  },
});