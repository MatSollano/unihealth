import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Certificate = {
  id: number;
  title: string;
  files: string;
  issued: string;
  doctor: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Fit to Work Certificate',
    files: '29 files',
    issued: 'Jan 15, 2024',
    doctor: 'Dr. Sarah Connor',
  },
  {
    id: 2,
    title: 'Medical Clearance',
    files: '',
    issued: 'Jan 5, 2023',
    doctor: 'Dr. John Garcia',
  },
  {
    id: 3,
    title: 'Health Assessment',
    files: '',
    issued: 'Oct 5, 2023',
    doctor: 'Dr. Emily Santos',
  },
  {
    id: 4,
    title: 'Vaccination Record',
    files: '',
    issued: 'Dec 5, 2023',
    doctor: 'Dr. James Rojas',
  },
];

const MedicalCertificates = () => {
  const [search, setSearch] = useState('');

  const filtered = certificates.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderCard = ({ item }: { item: Certificate }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text-outline" size={wp('7%')} color="#2563EB" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      {item.files ? <Text style={styles.files}>{item.files}</Text> : null}
      <Text style={styles.issued}>Issued on {item.issued}</Text>
      <Text style={styles.doctor}>{item.doctor}</Text>
      <Ionicons name="chevron-forward" size={wp('5%')} color="#9CA3AF" style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Certificate</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={wp('6%')} style={styles.icon} />
          {/* <Image source={require('../../assets/avatar.png')} style={styles.avatar} /> */}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={wp('5%')} color="#9CA3AF" />
        <TextInput
          placeholder="Search certificates"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingHorizontal: wp('5%'), paddingBottom: hp('10%') }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  searchInput: {
    marginLeft: wp('2%'),
    fontSize: wp('3.8%'),
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    width: wp('42%'),           
    height: hp('22%'),          
    position: 'relative',
    justifyContent: 'space-between', 
  },  
  iconContainer: {
    backgroundColor: '#DBEAFE',
    padding: wp('2.5%'),
    borderRadius: wp('2.5%'),
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: '600',
    marginBottom: hp('0.3%'),
  },
  files: {
    fontSize: wp('3.3%'),
    color: '#6B7280',
    marginBottom: hp('0.3%'),
  },
  issued: {
    fontSize: wp('3.3%'),
    color: '#6B7280',
  },
  doctor: {
    fontSize: wp('3.4%'),
    color: '#111827',
    fontWeight: '500',
    marginTop: hp('0.5%'),
  },
  chevron: {
    position: 'absolute',
    bottom: wp('3%'),
    right: wp('3%'),
  },
});

export default MedicalCertificates;
