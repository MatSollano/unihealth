import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/SignInScreen';
import RegisterScreen from '../screens/auth/SignUpScreen';

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen name="SignInScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
