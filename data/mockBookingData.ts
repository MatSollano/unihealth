export const mockBookingData = {
  doctor: {
    id: '1',
    name: 'Dr. Ramon Santos',
    specialty: 'Endocrinologist',
    experience: '15+ years experience',
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
  },

  clinics: [
    { id: 'main', name: 'Main Clinic', address: '123 Medical Center Ave' },
    { id: 'east', name: 'East Wing', address: '456 Health Blvd' },
  ],

  dateOptions: Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      label: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toISOString().split('T')[0],
    };
  }),

  timeSlots: [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:30 PM', available: true },
    { time: '3:00 PM', available: false },
  ],

  patient: {
    name: 'John Smith',
    age: 32,
    phone: '+63 912 345 6789',
  },
};