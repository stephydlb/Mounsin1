import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, User } from '../contexts/AppContext';
import { mockUser, mockAppointments, mockMedicalRecords, mockNotifications, mockDoctors, mockPharmacies, mockVaccinations } from '../data/mockData';

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
    // In a real app, this would make an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        localStorage.setItem('isAuthenticated', 'true');
        // Load user and all app data
        dispatch({ type: 'SET_USER', payload: mockUser });
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
    login
  };
}