import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientDashboard from '../screens/patient/PatientDashboardScreen';
// You will create these screens similarly later
import Prescriptions from '../screens/patient/Prescriptions';
import Appointments from '../screens/patient/Appointments';
import MedicalCertificates from '../screens/patient/MedicalCertificates';
import Profile from '../screens/patient/Profile';

const Tab = createBottomTabNavigator();

export default function PatientNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={PatientDashboard} />
      <Tab.Screen name="Visits" component={Appointments} />
      <Tab.Screen name="Prescription" component={Prescriptions} />
      <Tab.Screen name="Med Certs" component={MedicalCertificates} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
