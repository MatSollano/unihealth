import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Settings, 
  User, 
  FileText, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Camera,
  Edit
} from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function ProfileScreen() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/signin');
  };

  const menuItems = [
    {
      icon: <User size={24} color="#6B7280" />,
      title: 'Personal Information',
      subtitle: 'Update your details',
      onPress: () => {},
    },
    {
      icon: <FileText size={24} color="#6B7280" />,
      title: 'Medical History',
      subtitle: 'View your records',
      onPress: () => {},
    },
    {
      icon: <Shield size={24} color="#6B7280" />,
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy',
      onPress: () => {},
    },
    {
      icon: <Settings size={24} color="#6B7280" />,
      title: 'Settings',
      subtitle: 'App preferences',
      onPress: () => {},
    },
    {
      icon: <HelpCircle size={24} color="#6B7280" />,
      title: 'Help & Support',
      subtitle: 'Get assistance',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#004D80" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@email.com</Text>
          <Text style={styles.patientId}>Patient ID: #HC-2024-001</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  {item.icon}
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
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
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#004D80',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  patientId: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
});