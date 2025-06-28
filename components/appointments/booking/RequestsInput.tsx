import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface RequestsInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function RequestsInput({ value, onChangeText }: RequestsInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Symptoms or Special Requests</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="e.g. Recurring headaches, allergic to penicillin..."
        style={styles.input}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});