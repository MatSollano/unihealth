// navigation/VisitsStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Appointments from '../screens/patient/Appointments';
import BookAppointment from '../screens/patient/BookAppointment';

const Stack = createNativeStackNavigator();

const VisitsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
    </Stack.Navigator>
  );
};

export default VisitsStackNavigator;
