import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Download } from 'lucide-react-native';
import { CertificateCard } from '@/components/certificates/CertificateCard';
import { SearchBar } from '@/components/ui/SearchBar';

const mockCertificates = [
  {
    id: '1',
    title: 'Medical Fitness Certificate',
    issueDate: '2024-01-15',
    expiryDate: '2024-07-15',
    doctorName: 'Dr. Sarah Johnson',
    type: 'fitness' as const,
  },
  {
    id: '2',
    title: 'Vaccination Certificate',
    issueDate: '2023-12-10',
    expiryDate: '2024-12-10',
    doctorName: 'Dr. Michael Chen',
    type: 'vaccination' as const,
  },
  {
    id: '3',
    title: 'Medical Leave Certificate',
    issueDate: '2024-01-05',
    expiryDate: '2024-01-12',
    doctorName: 'Dr. Emily Rodriguez',
    type: 'leave' as const,
  },
];

export default function CertificatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCertificates = mockCertificates.filter(certificate =>
    certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    certificate.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Certificates</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bell size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search certificates..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Certificates List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.certificatesList}>
          {filteredCertificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              {...certificate}
              onPress={() => {}}
              onDownload={() => {}}
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
  certificatesList: {
    padding: 20,
    gap: 12,
  },
});