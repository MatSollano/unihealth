import { create } from 'zustand';

interface HealthData {
  heartRate: number;
  steps: number;
  sleep: number;
  lastUpdated: string;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  imageUrl: string;
}

interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  doctorName: string;
  prescribedDate: string;
  daysLeft: number;
  status: 'active' | 'expired';
}

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  expiryDate: string;
  doctorName: string;
  type: 'fitness' | 'vaccination' | 'leave';
}

interface HealthState {
  healthData: HealthData;
  appointments: Appointment[];
  prescriptions: Prescription[];
  certificates: Certificate[];
  setHealthData: (data: HealthData) => void;
  setAppointments: (appointments: Appointment[]) => void;
  setPrescriptions: (prescriptions: Prescription[]) => void;
  setCertificates: (certificates: Certificate[]) => void;
}

export const useHealthStore = create<HealthState>((set) => ({
  healthData: {
    heartRate: 72,
    steps: 8432,
    sleep: 7.5,
    lastUpdated: new Date().toISOString(),
  },
  appointments: [],
  prescriptions: [],
  certificates: [],
  setHealthData: (healthData) => set({ healthData }),
  setAppointments: (appointments) => set({ appointments }),
  setPrescriptions: (prescriptions) => set({ prescriptions }),
  setCertificates: (certificates) => set({ certificates }),
}));