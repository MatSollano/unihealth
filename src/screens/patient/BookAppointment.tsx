import React, { useState } from 'react';
import { ScrollView, View, Text, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DoctorCard, { Doctor } from './Appointments/BookAppointment/Doctor';
import ClinicSelector, { Clinic } from './Appointments/BookAppointment/ClinicSelector';
import DateSelector from './Appointments/BookAppointment/DateSelector';
import TimeSlotSelector from './Appointments/BookAppointment/TimeSelector';
import PatientInfo from './Appointments/BookAppointment/PatientInfo';
import SpecialRequestsInput from './Appointments/BookAppointment/RequestsInput';

const BookAppointmentScreen: React.FC = () => {
  // Sample data
  const doctor: Doctor = {
    id: '1',
    name: 'Dr. Ramon Santos',
    specialty: 'Endocrinologist',
    experience: '15+ years experience',
    imageUrl: 'https://yourcdn.com/doctor-profile.jpg',
  };

  const clinics: Clinic[] = [
    { id: 'main', name: 'Main Clinic', address: '123 Medical Center Ave' },
    { id: 'east', name: 'East Wing', address: '456 Health Blvd' },
  ];

  const dateOptions = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      label: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toISOString().split('T')[0],
    };
  });

  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    // { time: '1:00 PM', available: true },
    // { time: '2:30 PM', available: true },
    // { time: '3:00 PM', available: false },
  ];

  const patient = {
    name: 'John Smith',
    age: 32,
    phone: '+63 912 345 6789',
  };

  // State
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(clinics[0]);
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
      `With ${doctor.name} at ${selectedClinic?.name}\n${selectedDate} at ${selectedTime}`
    );

  };

  return (
    <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Ionicons name="chevron-back" size={wp('6%')} />
      <Text style={styles.headerTitle}>Book Appointment</Text>
      <Ionicons name="notifications-outline" size={wp('6%')} style={styles.icon} />
    </View>
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <DoctorCard doctor={doctor} />
      <ClinicSelector
        selectedClinic={selectedClinic}
        onPress={() => {
          const nextClinic =
            selectedClinic?.id === clinics[0].id ? clinics[1] : clinics[0];
          setSelectedClinic(nextClinic);
        }}
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
      <SpecialRequestsInput
        value={specialRequests}
        onChangeText={setSpecialRequests}
      />
      <TouchableOpacity style={styles.bookButton} onPress={handleSubmit}>
        <Text style={styles.bookText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

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
  icon: { marginHorizontal: wp('2%') },
  bookButton: {
    width: '100%',
    backgroundColor: '#004D80',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('2.5%'),
  },
  bookText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '500',
    alignSelf: 'center'
  },
})

export default BookAppointmentScreen;
