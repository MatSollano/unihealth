import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Mail, Lock, User } from 'lucide-react-native';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { SocialButtons } from '@/components/auth/SocialButtons';

const { width } = Dimensions.get('window');

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    console.log('Signing up...');
    // Implement signup logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/health-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Your Health, Unified as One</Text>

      <TextInput
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
        icon={<User size={20} color="#777" />}
      />

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        icon={<Mail size={20} color="#777" />}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Create password"
        value={password}
        onChangeText={setPassword}
        icon={<Lock size={20} color="#777" />}
        secureTextEntry
      />

      <TextInput
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        icon={<Lock size={20} color="#777" />}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      <SocialButtons />

      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
            <Text style={styles.signinLink}>Sign In</Text>
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
  footerContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#444',
  },
  signinLink: {
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