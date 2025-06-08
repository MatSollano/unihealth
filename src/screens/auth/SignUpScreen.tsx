import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import TextInputField from '../../components/common/Input';
import PrimaryButton from '../../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import GoogleLogo from '../../assets/GoogleLogo';

import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
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
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/health-logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Your Health, Unified as One</Text>

      <TextInputField
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
        iconName="person"
      />
      <TextInputField
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        iconName="mail"
        keyboardType="email-address"
      />
      <TextInputField
        placeholder="Create password"
        value={password}
        onChangeText={setPassword}
        iconName="lock-closed"
        secureTextEntry
      />
      <TextInputField
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        iconName="lock-closed"
        secureTextEntry
      />

      <PrimaryButton title="Sign Up" onPress={handleSignUp} />

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Or sign up with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socials}>
        <TouchableOpacity>
          <GoogleLogo width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="apple" size={27} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="logo-facebook" size={28} color="#1877F2" />
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.signinLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.link}>Terms</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  // logo: { width: 400, height: 80, resizeMode: 'contain', alignSelf: 'center' },
  logo: {
    width: width * 0.8,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subtitle: { textAlign: 'center', marginBottom: 24, color: '#555' },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#999',
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  icon: {
    width: 42,
    height: 42,
    marginHorizontal: 10,
    tintColor: '#444',
  },
  signInText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
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
  signinLink: { fontWeight: 500, color: '#004d80' },
});
