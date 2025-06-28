export const mockData = {
  prescriptions: [
    {
      id: 'rx1',
      doctor: 'Dr. Jane Doe',
      medicine: 'Amoxicillin',
      dosage: '500mg, 3 times daily',
      dateIssued: '2025-06-01'
    },
    {
      id: 'rx2',
      doctor: 'Dr. John Smith',
      medicine: 'Ibuprofen',
      dosage: '200mg, twice daily',
      dateIssued: '2025-06-01'
    }
  ],

  appointments: [
    {
      id: 1,
      doctorName: 'Dr. John Garcia',
      specialty: 'Cardiologist',
      clinic: 'Central Medical Center',
      address: '123 UniHealth Ave, Lapu-Lapu City',
      date: 'Dec 15, 2023',
      time: '10:30 AM',
      status: 'Completed' as const,
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      clinic: 'SkinHealth Clinic',
      address: '456 Wellness Blvd, Cebu City',
      date: 'Dec 17, 2023',
      time: '2:00 PM',
      status: 'Canceled' as const,
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Tan',
      specialty: 'Pediatrician',
      clinic: 'Family Care Center',
      address: '789 Healthy St, Mandaue City',
      date: 'Dec 20, 2023',
      time: '9:00 AM',
      status: 'Pending' as const,
    },
  ],

  medicalHistory: [
    {
      id: 'hist1',
      condition: 'Hypertension',
      description: 'Stable under medication',
      date: '2023-03-15'
    },
    {
      id: 'hist2',
      condition: 'Asthma',
      description: 'Seasonal flare-ups',
      date: '2020-07-22'
    },
  ],

  certificates: [
    {
      id: 1,
      title: 'Fit to Work Certificate',
      files: '29 files',
      issued: 'Jan 15, 2024',
      doctor: 'Dr. Sarah Connor',
    },
    {
      id: 2,
      title: 'Medical Clearance',
      files: '',
      issued: 'Jan 5, 2023',
      doctor: 'Dr. John Garcia',
    },
    {
      id: 3,
      title: 'Health Assessment',
      files: '',
      issued: 'Oct 5, 2023',
      doctor: 'Dr. Emily Santos',
    },
    {
      id: 4,
      title: 'Vaccination Record',
      files: '',
      issued: 'Dec 5, 2023',
      doctor: 'Dr. James Rojas',
    },
  ],
};