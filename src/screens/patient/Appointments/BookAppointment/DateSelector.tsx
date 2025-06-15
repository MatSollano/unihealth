import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface DateOption {
  label: string; // e.g., "Today", "Thu"
  date: string;  // ISO string, e.g., "2025-06-15"
}

interface DateSelectorProps {
  dates: DateOption[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ dates, selectedDate, onSelectDate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date</Text>
      <FlatList
        horizontal
        data={dates}
        keyExtractor={(item) => item.date}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => {
          const isSelected = item.date === selectedDate;
          const day = new Date(item.date).getDate();

          return (
            <Pressable
              onPress={() => onSelectDate(item.date)}
              style={[styles.dateButton, isSelected && styles.selectedButton]}
            >
              <Text style={[styles.dayLabel, isSelected && styles.selectedText]}>{item.label}</Text>
              <Text style={[styles.dateNumber, isSelected && styles.selectedText]}>{day}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  dateButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#004D80',
  },
  dayLabel: {
    fontSize: 13,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  dateNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
});
