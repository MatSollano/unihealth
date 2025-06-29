import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Bell, Download, Plus } from 'lucide-react-native';
import { CertificateCard } from '@/components/certificates/CertificateCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuthStore } from '@/store/authStore';
import { useHealthStore } from '@/store/healthStore';
import { getCertificates } from '@/services/firebaseService';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';

export default function CertificatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const { certificates, setCertificates, loading, error, setLoading, setError } = useHealthStore();

  useEffect(() => {
    if (user) {
      loadCertificates();
    }
  }, [user]);

  const loadCertificates = async () => {
    if (user) {
      setLoading('certificates', true);
      try {
        const data = await getCertificates(user.uid);
        setCertificates(data);
      } catch (error) {
        setError('certificates', error.message);
      } finally {
        setLoading('certificates', false);
      }
    }
  };

  const filteredCertificates = certificates.filter(certificate =>
    certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    certificate.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCertificatePress = (certificateId: string) => {
    router.push(`/(tabs)/certificates/${certificateId}`);
  };

  const handleAddCertificate = () => {
    router.push('/(tabs)/certificates/add');
  };

  if (loading.certificates) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Certificates</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddCertificate}>
            <Plus size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bell size={24} color={Colors.textSecondary} />
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

      {/* Error State */}
      {error.certificates && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.certificates}</Text>
        </View>
      )}

      {/* Certificates List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.certificatesList}>
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                {...certificate}
                onPress={() => handleCertificatePress(certificate.id)}
                onDownload={() => {}}
              />
            ))
          ) : (
            <EmptyState
              title="No certificates found"
              description={searchQuery ? "Try adjusting your search terms" : "Request your first medical certificate"}
              actionText="Request Certificate"
              onAction={handleAddCertificate}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontFamily: 'Inter-Bold',
    color: Colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  certificatesList: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  errorContainer: {
    margin: Spacing.xl,
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  errorText: {
    fontSize: FontSizes.md,
    fontFamily: 'Inter-Regular',
    color: Colors.error,
  },
});