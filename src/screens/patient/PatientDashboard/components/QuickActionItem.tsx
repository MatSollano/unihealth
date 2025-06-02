import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuickActionItemProps {
  icon: string;
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
}

const QuickActionItem: React.FC<QuickActionItemProps> = ({
  label,
  icon,
  onPress,
  backgroundColor = '#F1F3F4',
}) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.iconWrapper}>
          <Ionicons name={icon as any} size={24} color="#4F8EF7" />
        </View>      
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    justifyContent: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    margin: 8,
    color: '#333',
    fontWeight: '500',
  },
  iconWrapper: {
    backgroundColor: '#E3ECFF',
    padding: 12,
    borderRadius: 24,
    marginHorizontal: 8,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QuickActionItem;
