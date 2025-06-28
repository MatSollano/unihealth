import { database, auth } from '@/lib/firebase';
import { ref, set, get, push, remove, onValue, off } from 'firebase/database';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { useHealthStore } from '@/store/healthStore';

// Auth functions
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user profile to database
    await set(ref(database, `users/${user.uid}`), {
      name,
      email,
      createdAt: new Date().toISOString(),
    });
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Initialize auth state listener
export const initializeAuth = () => {
  const { setUser, setLoading } = useAuthStore.getState();
  
  return onAuthStateChanged(auth, (user) => {
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