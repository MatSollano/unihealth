import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import PatientNavigator from './src/navigation/PatientNavigator';
import useAuthStore from './src/state/authStore';

export default function App() {
  const user = useAuthStore(state => state.user);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? <PatientNavigator /> : <AuthNavigator />}
      </NavigationContainer>    
    </SafeAreaProvider>
  );
}
