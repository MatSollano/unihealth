import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientDashboard from '../screens/patient/Dashboard';
// You will create these screens similarly later
import Prescriptions from '../screens/patient/Prescriptions';
import Appointments from '../screens/patient/Appointments';
import MedicalCertificates from '../screens/patient/MedicalCertificates';
import Profile from '../screens/patient/Profile';

const Tab = createBottomTabNavigator();

export default function PatientNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={PatientDashboard} />
      <Tab.Screen name="Prescriptions" component={Prescriptions} />
      <Tab.Screen name="Appointments" component={Appointments} />
      <Tab.Screen name="MedicalCertificates" component={MedicalCertificates} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
