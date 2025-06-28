import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Fingerprint, Mail, Lock } from 'lucide-react-native';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

const { width } = Dimensions.get('window');

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuthStore();

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill out both fields.');
      return;
    }
    
    // Mock authentication - replace with real auth
    setUser({ email, id: '1', name: 'John Doe' });
    router.replace('/(tabs)');
  };

  const handleBiometricLogin = () => {
    Alert.alert('Biometric Login', 'Fingerprint login tapped!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/health-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Your Health, Unified as One</Text>

      <TextInput
        placeholder="Email or username"
        value={email}
        onChangeText={setEmail}
        icon={<Mail size={20} color="#777" />}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        icon={<Lock size={20} color="#777" />}
        secureTextEntry
      />

      <TouchableOpacity style={styles.forgotWrapper}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title="Sign In" onPress={handleSignIn} />

      <Text style={styles.orText}>Or use biometric login</Text>

      <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin}>
        <Fingerprint size={32} color="#1e3a8a" />
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By signing in, you agree to our{' '}
          <Text style={styles.link}>Terms</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: width * 0.8,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#555',
    fontSize: 16,
  },
  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontWeight: '500',
    color: '#004d80',
  },
  orText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 24,
  },
  biometricButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e8f0fe',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#444',
  },
  signupLink: {
    fontWeight: '500',
    color: '#004d80',
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  link: {
    color: '#1e3a8a',
    textDecorationLine: 'underline',
  },
});