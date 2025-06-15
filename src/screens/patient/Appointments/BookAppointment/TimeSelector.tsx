import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface TimeSlot {
  time: string; // e.g., "9:00 AM"
  available: boolean;
}

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedTime,
  onSelectTime,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Available Time Slots</Text>
      <View style={styles.grid}>
        {slots.map((slot) => {
          const isSelected = slot.time === selectedTime;
          const isDisabled = !slot.available;

          return (
            <Pressable
              key={slot.time}
              disabled={isDisabled}
              onPress={() => onSelectTime(slot.time)}
              style={[
                styles.slot,
                isSelected && styles.selectedSlot,
                isDisabled && styles.disabledSlot,
              ]}
            >
              <Text
                style={[
                  styles.slotText,
                  isSelected && styles.selectedText,
                  isDisabled && styles.disabledText,
                ]}
              >
                {slot.time}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TimeSlotSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    paddingVertical: hp('1%'),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  slot: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSlot: {
    backgroundColor: '#004D80',
  },
  disabledSlot: {
    backgroundColor: '#e0e0e0',
  },
  slotText: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  disabledText: {
    color: '#aaa',
  },
});
