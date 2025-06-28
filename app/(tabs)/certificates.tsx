import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Download } from 'lucide-react-native';
import { CertificateCard } from '@/components/certificates/CertificateCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { useAuthStore } from '@/store/authStore';
import { useHealthStore } from '@/store/healthStore';
import { getCertificates } from '@/services/firebaseService';

export default function CertificatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const { certificates, setCertificates } = useHealthStore();

  useEffect(() => {
    if (user) {
      loadCertificates();
    }
  }, [user]);

  const loadCertificates = async () => {
    if (user) {
      try {
        const data = await getCertificates(user.uid);
        setCertificates(data);
      } catch (error) {
        console.error('Error loading certificates:', error);
      }
    }
  };

  const filteredCertificates = certificates.filter(certificate =>
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
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                {...certificate}
                onPress={() => {}}
                onDownload={() => {}}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No certificates found</Text>
            </View>
          )}
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
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});