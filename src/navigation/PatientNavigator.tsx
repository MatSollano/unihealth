import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Screens
import PatientDashboard from '../screens/patient/PatientDashboardScreen';
import Prescriptions from '../screens/patient/Prescriptions';
import Appointments from '../screens/patient/Appointments';
import VisitsStackNavigator from './VisitsStackNavigator';
import MedicalCertificates from '../screens/patient/MedicalCertificates';
import Profile from '../screens/patient/Profile';

const Tab = createBottomTabNavigator();

// Helper HOC to wrap with SafeAreaView
function withTopSafeArea(Component: React.ComponentType<any>) {
  return (props: any) => (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Component {...props} />
    </SafeAreaView>
  );
}

export default function PatientNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          const iconSize = focused ? 20 : 20;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Visits':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Prescription':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Med Certs':
              iconName = focused ? 'medkit' : 'medkit-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={withTopSafeArea(PatientDashboard)} />
      {/* <Tab.Screen name="Visits" component={withTopSafeArea(Appointments)} /> */}
      <Tab.Screen name="Visits" component={withTopSafeArea(VisitsStackNavigator)} />
      <Tab.Screen name="Prescription" component={withTopSafeArea(Prescriptions)} />
      <Tab.Screen name="Med Certs" component={withTopSafeArea(MedicalCertificates)} />
      <Tab.Screen name="Profile" component={withTopSafeArea(Profile)} />
    </Tab.Navigator>
  );
}
