import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TextInputField from '../../components/common/Input';
import PrimaryButton from '../../components/common/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '../../state/authStore'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const setUser = useAuthStore(state => state.setUser);

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill out both fields.');
      return;
    }
    setUser({ email });
    console.log('Logging in with:', email, password);
  };

  const handleFingerprintLogin = () => {
    Alert.alert('Biometric Login', 'Fingerprint login tapped!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/health-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Your Health, Unified as One</Text>

        <TextInputField
          placeholder="Email or username"
          value={email}
          onChangeText={setEmail}
          iconName="mail"
          keyboardType="email-address"
        />

        <TextInputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          iconName="lock-closed"
          secureTextEntry
        />

      <TouchableOpacity style={styles.forgotWrapper}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <PrimaryButton title="Sign In" onPress={handleLogin} />

      <Text style={styles.orText}>Or use biometric login</Text>

      <TouchableOpacity style={styles.circle} onPress={() => console.log('Biometric login tapped')}>
        <Ionicons name="finger-print" size={32} color="#1e3a8a" />
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.link}>Terms</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  logo: { width: 400, height: 80, resizeMode: 'contain', alignSelf: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 24, color: '#555' },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 48 },

  forgotWrapper: { alignItems: 'flex-end', marginBottom: 20 },
  forgotText: { fontWeight: 500, color: '#004d80' },

  signInBtn: {
    backgroundColor: '#004C79',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  signInText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  orText: { textAlign: 'center', color: '#777', marginVertical: 14, marginTop: 20 },
  // fingerprint: { width: 50, height: 40, alignSelf: 'center', margin: 10 },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e8f0fe',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },

  footerContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#444',
  },
  signupLink: { fontWeight: 500, color: '#004d80' },

  termsText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  link: {
    color: '#1e3a8a',
    textDecorationLine: 'underline',
  },
});
