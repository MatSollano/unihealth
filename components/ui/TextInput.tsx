import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface CustomTextInputProps extends TextInputProps {
  icon?: React.ReactNode;
}

export function TextInput({ icon, secureTextEntry, style, ...rest }: CustomTextInputProps) {
  const [hidePassword, setHidePassword] = useState(!!secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <RNTextInput
        style={styles.input}
        secureTextEntry={hidePassword}
        placeholderTextColor="#999"
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          {hidePassword ? (
            <EyeOff size={20} color="#777" />
          ) : (
            <Eye size={20} color="#777" />
          )}
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});