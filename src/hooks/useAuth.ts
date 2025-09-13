import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, User } from '../contexts/AppContext';
import { mockUser, mockAppointments, mockMedicalRecords, mockNotifications, mockDoctors, mockPharmacies, mockVaccinations } from '../data/mockData';

interface RegisterData {
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  clinicName?: string;
  position?: string;
  specialty?: string;
}

export function useAuth() {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const isAuthenticated = !!state.user;
  const user = state.user;

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem('isAuthenticated');
        
        if (authStatus === 'true') {
          // Load user and all app data
          dispatch({ type: 'SET_USER', payload: mockUser });
          dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
          dispatch({ type: 'SET_MEDICAL_RECORDS', payload: mockMedicalRecords });
          dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
          dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
          dispatch({ type: 'SET_PHARMACIES', payload: mockPharmacies });
          dispatch({ type: 'SET_VACCINATIONS', payload: mockVaccinations });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    dispatch({ type: 'SET_USER', payload: null as any });
    navigate('/fr/auth/login');
  };

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate the user
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (email === 'patient@example.com' && password === 'password') {
          const authenticatedUser: User = {
            ...mockUser, // Assuming mockUser is a patient
            email,
            role: 'patient',
          };
          localStorage.setItem('isAuthenticated', 'true');
          dispatch({ type: 'SET_USER', payload: authenticatedUser });
          dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
          dispatch({ type: 'SET_MEDICAL_RECORDS', payload: mockMedicalRecords });
          dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
          dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
          dispatch({ type: 'SET_PHARMACIES', payload: mockPharmacies });
          dispatch({ type: 'SET_VACCINATIONS', payload: mockVaccinations });
          resolve();
        } else if (email === 'doctor@example.com' && password === 'password') {
          const authenticatedUser: User = {
            id: 'doc1',
            email,
            firstName: 'Dr. John',
            lastName: 'Doe',
            phone: '123-456-7890',
            dateOfBirth: '1980-01-01',
            address: '123 Clinic St',
            city: 'Healthville',
            role: 'doctor',
            clinicName: 'Health Clinic',
            position: 'General Practitioner',
            specialty: 'Family Medicine',
          };
          localStorage.setItem('isAuthenticated', 'true');
          dispatch({ type: 'SET_USER', payload: authenticatedUser });
          dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
          dispatch({ type: 'SET_MEDICAL_RECORDS', payload: mockMedicalRecords });
          dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
          dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
          dispatch({ type: 'SET_PHARMACIES', payload: mockPharmacies });
          dispatch({ type: 'SET_VACCINATIONS', payload: mockVaccinations });
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (data: RegisterData) => {
    // In a real app, this would make an API call to register the user
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock registration logic
        const newUser: User = {
          id: `user-${Date.now()}`, // Generate a unique ID
          email: data.email,
          firstName: 'New', // Placeholder
          lastName: data.role === 'doctor' ? 'Doctor' : 'Patient', // Placeholder
          phone: '',
          dateOfBirth: '',
          address: '',
          city: '',
          role: data.role,
          ...(data.role === 'patient' && {
            medicalId: `med-${Date.now()}`,
            emergencyContact: { name: '', phone: '', relationship: '' },
          }),
          ...(data.role === 'doctor' && {
            clinicName: data.clinicName,
            position: data.position,
            specialty: data.specialty,
          }),
        };

        // For demonstration, we'll just log the new user and then log them in
        console.log('Registered new user:', newUser);
        localStorage.setItem('isAuthenticated', 'true');
        dispatch({ type: 'SET_USER', payload: newUser });
        dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
        dispatch({ type: 'SET_MEDICAL_RECORDS', payload: mockMedicalRecords });
        dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
        dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
        dispatch({ type: 'SET_PHARMACIES', payload: mockPharmacies });
        dispatch({ type: 'SET_VACCINATIONS', payload: mockVaccinations });
        resolve();
      }, 1000);
    });
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    logout,
    login,
    register, // Added register to the returned object
  };
}
