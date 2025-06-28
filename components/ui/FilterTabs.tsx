import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface FilterTabsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export function FilterTabs({ options, selectedOption, onSelect }: FilterTabsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.tab,
            selectedOption === option && styles.selectedTab,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.tabText,
              selectedOption === option && styles.selectedTabText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  selectedTab: {
    backgroundColor: '#004D80',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  selectedTabText: {
    color: '#fff',
  },
});