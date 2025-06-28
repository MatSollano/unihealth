import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // Add a small delay to ensure the navigation system is ready
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (user) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/signin');
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [user, isLoading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#004D80" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});