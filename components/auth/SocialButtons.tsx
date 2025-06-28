import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Facebook } from 'lucide-react-native';
import { GoogleLogo } from '@/components/icons/GoogleLogo';
import { AppleLogo } from '@/components/icons/AppleLogo';

export function SocialButtons() {
  return (
    <>
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Or sign up with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socials}>
        <TouchableOpacity style={styles.socialButton}>
          <GoogleLogo />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AppleLogo />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Facebook size={28} color="#1877F2" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 16,
    color: '#999',
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
  },
  socialButton: {
    padding: 8,
  },
});