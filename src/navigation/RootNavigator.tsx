import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useAuthStore from '../state/authStore';
import AuthNavigator from './AuthNavigator';
import PatientNavigator from './PatientNavigator';
import SpecialistNavigator from './SpecialistNavigator';

const RootNavigator = () => {
  const { user, role } = useAuthStore();

  let Screen;
  if (!user) {
    Screen = <AuthNavigator />;
  } else if (role === 'patient') {
    Screen = <PatientNavigator />;
  } else if (role === 'specialist') {
    Screen = <SpecialistNavigator />;
  }

  return <NavigationContainer>{Screen}</NavigationContainer>;
};

export default RootNavigator;
