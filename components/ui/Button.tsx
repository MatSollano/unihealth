import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'secondary' && styles.secondaryButton,
        style
      ]} 
      {...rest}
    >
      <Text style={[
        styles.text,
        variant === 'secondary' && styles.secondaryText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#004a80',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#004a80',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#004a80',
  },
});