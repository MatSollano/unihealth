import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, FileText, ChevronRight } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mockData } from '@/data/mockData';

export default function MedicalCertificatesScreen() {
  const [search, setSearch] = useState('');
  const { certificates } = mockData;

  const filtered = certificates.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderCard = ({ item }: { item: typeof certificates[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <FileText size={wp('7%')} color="#2563EB" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      {item.files ? <Text style={styles.files}>{item.files}</Text> : null}
      <Text style={styles.issued}>Issued on {item.issued}</Text>
      <Text style={styles.doctor}>{item.doctor}</Text>
      <ChevronRight size={wp('5%')} color="#9CA3AF" style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Certificates</Text>
        <View style={styles.headerIcons}>
          <Bell size={wp('6%')} color="#333" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={wp('5%')} color="#9CA3AF" />
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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

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
  listContent: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('10%'),
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