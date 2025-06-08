import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Prescription = {
  id: number;
  name: string;
  dosage: string;
  doctor: string;
  issued: string;
  expires: string;
  avatar?: any;
};

const prescriptions: Prescription[] = [
  {
    id: 1,
    name: 'Amoxicillin',
    dosage: '500mg, 3 times daily',
    doctor: 'Dr. John Garcia',
    issued: 'Jan 15, 2024',
    expires: 'Feb 15, 2024',
  },
  {
    id: 2,
    name: 'Lisinopril',
    dosage: '10mg, once daily',
    doctor: 'Dr. Sarah Connor',
    issued: 'Jan 10, 2024',
    expires: 'Apr 10, 2024',
  },
  {
    id: 3,
    name: 'Metformin',
    dosage: '850mg, twice daily',
    doctor: 'Dr. John Garcia',
    issued: 'Feb 5, 2024',
    expires: 'May 5, 2024',
  },
];

const filterTabs = ['All', 'Active', 'Completed', 'Expiring Soon'];

const Prescriptions = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Prescriptions</Text>
        <View style={styles.icons}>
          <Ionicons name="notifications-outline" size={wp('6%')} style={styles.icon} />
          {/* <Image source={require('../../assets/avatar.png')} style={styles.avatar} /> */}
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={wp('4.5%')} color="#9CA3AF" />
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
      <ScrollView contentContainerStyle={{ paddingBottom: hp('10%'), paddingTop: hp('1%') }}>
        {prescriptions.map((prescription) => (
          <View key={prescription.id} style={styles.card}>
            <Text style={styles.medName}>{prescription.name}</Text>
            <Text style={styles.dosage}>{prescription.dosage}</Text>
            <View style={styles.doctorRow}>
              {/* <Image
                source={require('../../assets/doc1.jpg')}
                style={styles.docAvatar}
              /> */}
              <Text style={styles.docName}>{prescription.doctor}</Text>
            </View>
            <Text style={styles.date}>
              Issued: {prescription.issued}{'\n'}Expires: {prescription.expires}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={wp('5%')}
              color="#6B7280"
              style={styles.arrowIcon}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8FF' },
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
  icon: { marginRight: wp('3%') },
  avatar: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
  },
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
    marginBottom: hp('1%'),
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
  docAvatar: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    marginRight: wp('2%'),
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

export default Prescriptions;
