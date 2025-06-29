export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export interface HealthData {
  heartRate: number;
  steps: number;
  sleep: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
    recordedAt: string;
  };
  weight?: number;
  bodyTemperature?: number;
  oxygenSaturation?: number;
  lastUpdated: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  imageUrl: string;
  notes?: string;
  address?: string;
  phone?: string;
  createdAt: string;
  reminderSet?: boolean;
  reminderTime?: string;
}

export interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  doctorName: string;
  prescribedDate: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  status: 'active' | 'expired';
  instructions?: string;
  sideEffects?: string[];
  refillsRemaining?: number;
  pharmacy?: {
    name: string;
    address: string;
    phone: string;
  };
  createdAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  expiryDate: string;
  doctorName: string;
  type: 'fitness' | 'vaccination' | 'leave';
  purpose?: string;
  validFor?: string;
  restrictions?: string;
  clinic?: string;
  licenseNumber?: string;
  certificateNumber?: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  licenseNumber: string;
  phone: string;
  email: string;
  address: string;
  experience: number;
  education: string;
  certifications: string[];
  imageUrl: string;
  availability: Record<string, string[]>;
  rating: number;
  reviewCount: number;
}

export interface Notification {
  id: string;
  type: 'appointment_reminder' | 'prescription_reminder' | 'health_alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  relatedId?: string;
}

export type FilterOption = 'All' | 'Upcoming' | 'Completed' | 'Cancelled' | 'Active' | 'Expired' | 'Low Stock';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}