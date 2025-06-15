import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Ionicons name="chevron-back" size={wp('6%')} /> */}
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="ellipsis-vertical" size={wp('5.5%')} />
      </View>

      {/* Profile Photo & Name */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/avatar/april.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={wp('4%')} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>April Marie Rosales</Text>
        <Text style={styles.patientId}>Patient ID: #PT-0892345</Text>
      </View>

      {/* List Items */}
      <View style={styles.list}>
        <TouchableOpacity style={styles.listItem}>
          <Ionicons name="person-outline" size={wp('5.5%')} color="#374151" />
          <View style={styles.listText}>
            <Text style={styles.listTitle}>Personal Information</Text>
            <Text style={styles.listSubtitle}>Phone, email, address</Text>
          </View>
          <Ionicons name="chevron-forward" size={wp('5%')} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Ionicons name="document-text-outline" size={wp('5.5%')} color="#374151" />
          <View style={styles.listText}>
            <Text style={styles.listTitle}>Terms and Conditions</Text>
            <Text style={styles.listSubtitle}>Use Policies</Text>
          </View>
          <Ionicons name="chevron-forward" size={wp('5%')} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Ionicons name="reader-outline" size={wp('5.5%')} color="#374151" />
          <View style={styles.listText}>
            <Text style={styles.listTitle}>User Manual</Text>
          </View>
          <Ionicons name="chevron-forward" size={wp('5%')} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={wp('5%')} color="#2563EB" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
  profileSection: {
    alignItems: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: wp('11%'),
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563EB',
    borderRadius: wp('4%'),
    padding: wp('1.5%'),
  },
  name: {
    fontSize: wp('5%'),
    fontWeight: '600',
    marginTop: hp('1%'),
  },
  patientId: {
    fontSize: wp('3.5%'),
    color: '#6B7280',
    marginTop: hp('0.3%'),
  },
  list: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
  },
  listText: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  listTitle: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#111827',
  },
  listSubtitle: {
    fontSize: wp('3.3%'),
    color: '#6B7280',
    marginTop: hp('0.3%'),
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
    marginHorizontal: wp('5%'),
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
  },
  logoutText: {
    color: '#2563EB',
    fontSize: wp('4%'),
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
});

export default ProfileScreen;
