import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SpecialistDashboard from '../screens/specialist/Dashboard';
import Visits from '../screens/specialist/Visits';
import Patients from '../screens/specialist/Patients';
import Prescriptions from '../screens/specialist/Prescriptions';
import MedicalCertificates from '../screens/specialist/MedicalCertificates';
import Profile from '../screens/specialist/Profile';

const Tab = createBottomTabNavigator();

export default function SpecialistNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={SpecialistDashboard} />
      <Tab.Screen name="Visits" component={Visits} />
      <Tab.Screen name="Patients" component={Patients} />
      <Tab.Screen name="Prescriptions" component={Prescriptions} />
      <Tab.Screen name="MedicalCertificates" component={MedicalCertificates} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
