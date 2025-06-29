import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Bell, Filter, Plus } from 'lucide-react-native';
import { PrescriptionListCard } from '@/components/prescriptions/PrescriptionListCard';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuthStore } from '@/store/authStore';
import { useHealthStore } from '@/store/healthStore';
import { getPrescriptions } from '@/services/firebaseService';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { FilterOption } from '@/types';

const filterOptions: FilterOption[] = ['All', 'Active', 'Expired', 'Low Stock'];

export default function PrescriptionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const { prescriptions, setPrescriptions, loading, error, setLoading, setError } = useHealthStore();

  useEffect(() => {
    if (user) {
      loadPrescriptions();
    }
  }, [user]);

  const loadPrescriptions = async () => {
    if (user) {
      setLoading('prescriptions', true);
      try {
        const data = await getPrescriptions(user.uid);
        setPrescriptions(data);
      } catch (error) {
        setError('prescriptions', error.message);
      } finally {
        setLoading('prescriptions', false);
      }
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesFilter = selectedFilter === 'All' || 
      (selectedFilter === 'Low Stock' && prescription.daysLeft <= 7) ||
      prescription.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch = prescription.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePrescriptionPress = (prescriptionId: string) => {
    router.push(`/(tabs)/prescriptions/${prescriptionId}`);
  };

  const handleAddPrescription = () => {
    router.push('/(tabs)/prescriptions/add');
  };

  if (loading.prescriptions) {
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
        <Text style={styles.headerTitle}>Prescriptions</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddPrescription}>
            <Plus size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bell size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search prescriptions..."
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

      {/* Error State */}
      {error.prescriptions && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.prescriptions}</Text>
        </View>
      )}

      {/* Prescriptions List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.prescriptionsList}>
          {filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map((prescription) => (
              <PrescriptionListCard
                key={prescription.id}
                {...prescription}
                onPress={() => handlePrescriptionPress(prescription.id)}
              />
            ))
          ) : (
            <EmptyState
              title="No prescriptions found"
              description={searchQuery ? "Try adjusting your search terms" : "Add your first prescription to get started"}
              actionText="Add Prescription"
              onAction={handleAddPrescription}
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
  prescriptionsList: {
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