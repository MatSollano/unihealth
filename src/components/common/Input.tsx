import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  iconName: keyof typeof Ionicons.glyphMap;
}

export default function TextInputField({ iconName, secureTextEntry, ...rest }: InputProps) {
  const [hidePassword, setHidePassword] = useState(!!secureTextEntry);

  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={20} color="#777" style={styles.icon} />
      <TextInput
        style={styles.input}
        secureTextEntry={hidePassword}
        placeholderTextColor="#999"
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#777"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
