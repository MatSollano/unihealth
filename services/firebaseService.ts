import { database, auth } from '@/lib/firebase';
import { ref, set, get, push, remove, onValue, off } from 'firebase/database';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { useHealthStore } from '@/store/healthStore';
import { UserRole } from '@/types';

// Auth functions
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user role from database
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    
    if (userData?.role) {
      useAuthStore.getState().setUserRole(userData.role);
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string, name?: string, role: UserRole = 'patient') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name if provided
    if (name && user) {
      await updateProfile(user, {
        displayName: name,
      });
    }
    
    // Save user profile to database with role
    await set(ref(database, `users/${user.uid}`), {
      name: name || user.displayName || '',
      email: user.email,
      role: role,
      createdAt: new Date().toISOString(),
    });
    
    // Set role in store
    useAuthStore.getState().setUserRole(role);
    
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    useAuthStore.getState().setUserRole(null);
  } catch (error) {
    throw error;
  }
};

// Initialize auth state listener
export const initializeAuth = () => {
  const { setUser, setLoading, setUserRole } = useAuthStore.getState();
  
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get user role from database
      try {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        
        if (userData?.role) {
          setUserRole(userData.role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    } else {
      setUserRole(null);
    }
    
    setUser(user);
    setLoading(false);
  });
};

// Health data functions
export const saveHealthData = async (userId: string, data: any) => {
  try {
    await set(ref(database, `healthData/${userId}`), {
      ...data,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const getHealthData = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `healthData/${userId}`));
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};

// Appointments functions
export const saveAppointment = async (userId: string, appointment: any) => {
  try {
    const appointmentsRef = ref(database, `appointments/${userId}`);
    await push(appointmentsRef, {
      ...appointment,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const getAppointments = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `appointments/${userId}`));
    const data = snapshot.val();
    if (data) {
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }
    return [];
  } catch (error) {
    throw error;
  }
};

// Doctor-specific appointment functions
export const getDoctorAppointments = async (doctorId: string) => {
  try {
    const snapshot = await get(ref(database, 'appointments'));
    const allAppointments = snapshot.val();
    const doctorAppointments = [];
    
    if (allAppointments) {
      Object.keys(allAppointments).forEach(userId => {
        const userAppointments = allAppointments[userId];
        Object.keys(userAppointments).forEach(appointmentId => {
          const appointment = userAppointments[appointmentId];
          if (appointment.doctorId === doctorId) {
            doctorAppointments.push({
              id: appointmentId,
              patientId: userId,
              ...appointment
            });
          }
        });
      });
    }
    
    return doctorAppointments;
  } catch (error) {
    throw error;
  }
};

// Prescriptions functions
export const savePrescription = async (userId: string, prescription: any) => {
  try {
    const prescriptionsRef = ref(database, `prescriptions/${userId}`);
    await push(prescriptionsRef, {
      ...prescription,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const getPrescriptions = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `prescriptions/${userId}`));
    const data = snapshot.val();
    if (data) {
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }
    return [];
  } catch (error) {
    throw error;
  }
};

// Doctor-specific prescription functions
export const getDoctorPrescriptions = async (doctorId: string) => {
  try {
    const snapshot = await get(ref(database, 'prescriptions'));
    const allPrescriptions = snapshot.val();
    const doctorPrescriptions = [];
    
    if (allPrescriptions) {
      Object.keys(allPrescriptions).forEach(userId => {
        const userPrescriptions = allPrescriptions[userId];
        Object.keys(userPrescriptions).forEach(prescriptionId => {
          const prescription = userPrescriptions[prescriptionId];
          if (prescription.doctorId === doctorId) {
            doctorPrescriptions.push({
              id: prescriptionId,
              patientId: userId,
              ...prescription
            });
          }
        });
      });
    }
    
    return doctorPrescriptions;
  } catch (error) {
    throw error;
  }
};

// Certificates functions
export const saveCertificate = async (userId: string, certificate: any) => {
  try {
    const certificatesRef = ref(database, `certificates/${userId}`);
    await push(certificatesRef, {
      ...certificate,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const getCertificates = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `certificates/${userId}`));
    const data = snapshot.val();
    if (data) {
      return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }
    return [];
  } catch (error) {
    throw error;
  }
};

// Doctor-specific certificate functions
export const getDoctorCertificates = async (doctorId: string) => {
  try {
    const snapshot = await get(ref(database, 'certificates'));
    const allCertificates = snapshot.val();
    const doctorCertificates = [];
    
    if (allCertificates) {
      Object.keys(allCertificates).forEach(userId => {
        const userCertificates = allCertificates[userId];
        Object.keys(userCertificates).forEach(certificateId => {
          const certificate = userCertificates[certificateId];
          if (certificate.doctorId === doctorId) {
            doctorCertificates.push({
              id: certificateId,
              patientId: userId,
              ...certificate
            });
          }
        });
      });
    }
    
    return doctorCertificates;
  } catch (error) {
    throw error;
  }
};

// Patient management functions for doctors
export const getDoctorPatients = async (doctorId: string) => {
  try {
    const appointmentsSnapshot = await get(ref(database, 'appointments'));
    const usersSnapshot = await get(ref(database, 'users'));
    
    const allAppointments = appointmentsSnapshot.val();
    const allUsers = usersSnapshot.val();
    const patientIds = new Set();
    
    if (allAppointments) {
      Object.keys(allAppointments).forEach(userId => {
        const userAppointments = allAppointments[userId];
        Object.keys(userAppointments).forEach(appointmentId => {
          const appointment = userAppointments[appointmentId];
          if (appointment.doctorId === doctorId) {
            patientIds.add(userId);
          }
        });
      });
    }
    
    const patients = [];
    patientIds.forEach(patientId => {
      if (allUsers[patientId]) {
        patients.push({
          id: patientId,
          ...allUsers[patientId]
        });
      }
    });
    
    return patients;
  } catch (error) {
    throw error;
  }
};

// Real-time listeners
export const subscribeToHealthData = (userId: string, callback: (data: any) => void) => {
  const healthRef = ref(database, `healthData/${userId}`);
  onValue(healthRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
  return () => off(healthRef);
};

export const subscribeToAppointments = (userId: string, callback: (data: any[]) => void) => {
  const appointmentsRef = ref(database, `appointments/${userId}`);
  onValue(appointmentsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const appointments = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      callback(appointments);
    } else {
      callback([]);
    }
  });
  return () => off(appointmentsRef);
};

export const subscribeToPatientAppointments = (patientId: string, callback: (data: any[]) => void) => {
  return subscribeToAppointments(patientId, callback);
};