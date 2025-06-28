import React, { useState } from 'react';
import { ScrollView, View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, Bell } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DoctorCard } from '@/components/appointments/booking/DoctorCard';
import { ClinicSelector } from '@/components/appointments/booking/ClinicSelector';
import { DateSelector } from '@/components/appointments/booking/DateSelector';
import { TimeSlotSelector } from '@/components/appointments/booking/TimeSlotSelector';
import { PatientInfo } from '@/components/appointments/booking/PatientInfo';
import { RequestsInput } from '@/components/appointments/booking/RequestsInput';
import { Button } from '@/components/ui/Button';
import { mockBookingData } from '@/data/mockBookingData';

export default function BookAppointmentScreen() {
  const { doctor, clinics, dateOptions, timeSlots, patient } = mockBookingData;

  const [selectedClinic, setSelectedClinic] = useState(clinics[0]);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].date);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');

  const handleSubmit = () => {
    if (!selectedTime) {
      Alert.alert('Please select a time slot.');
      return;
    }

    Alert.alert(
      'Appointment Confirmed',
      `With ${doctor.name} at ${selectedClinic?.name}\n${selectedDate} at ${selectedTime}`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const toggleClinic = () => {
    const nextClinic = selectedClinic?.id === clinics[0].id ? clinics[1] : clinics[0];
    setSelectedClinic(nextClinic);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={wp('6%')} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <Bell size={wp('6%')} color="#333" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DoctorCard doctor={doctor} />
        
        <ClinicSelector
          selectedClinic={selectedClinic}
          onPress={toggleClinic}
        />
        
        <DateSelector
          dates={dateOptions}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        
        <TimeSlotSelector
          slots={timeSlots}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
        />
        
        <PatientInfo
          patient={patient}
          onEdit={() => Alert.alert('Edit patient info (not implemented)')}
        />
        
        <RequestsInput
          value={specialRequests}
          onChangeText={setSpecialRequests}
        />

        <View style={styles.buttonContainer}>
          <Button title="Book Appointment" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: hp('5%'),
  },
  buttonContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
});