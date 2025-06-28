import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MapPin, ChevronDown } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export interface Clinic {
  id: string;
  name: string;
  address: string;
}

interface ClinicSelectorProps {
  selectedClinic: Clinic | null;
  onPress: () => void;
}

export function ClinicSelector({ selectedClinic, onPress }: ClinicSelectorProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MapPin size={20} color="#004D80" style={styles.icon} />
      <View>
        <Text style={styles.label}>{selectedClinic?.name ?? 'Select Clinic'}</Text>
        {selectedClinic?.address && <Text style={styles.address}>{selectedClinic.address}</Text>}
      </View>
      <ChevronDown size={20} color="#555" style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: wp('5%'),
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  address: {
    fontSize: 13,
    color: '#777',
  },
  chevron: {
    marginLeft: 'auto',
  },
});