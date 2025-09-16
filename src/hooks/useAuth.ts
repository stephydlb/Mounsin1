import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, User } from '../contexts/AppContext';
import { usersApi } from '../lib/api';
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
    // For now, simulate login by checking if user exists in DB
    // In production, integrate with Auth0
    const usersResponse = await usersApi.getAll();
    if (usersResponse.success && usersResponse.data) {
      const user = (usersResponse.data as User[]).find((u) => u.email === email);
      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        dispatch({ type: 'SET_USER', payload: user });
        // Load other data as before
        dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
        dispatch({ type: 'SET_MEDICAL_RECORDS', payload: mockMedicalRecords });
        dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
        dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
        dispatch({ type: 'SET_PHARMACIES', payload: mockPharmacies });
        dispatch({ type: 'SET_VACCINATIONS', payload: mockVaccinations });
      } else {
        throw new Error('User not found');
      }
    } else {
      throw new Error('Failed to fetch users');
    }
  };

  const signup = async (userData: Omit<User, 'id'>) => {
    const response = await usersApi.create(userData);
    if (response.success && response.data) {
      localStorage.setItem('isAuthenticated', 'true');
      dispatch({ type: 'SET_USER', payload: response.data as User });
      // Load other data
      dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
      dispatch({ type: 'SET_MEDICAL_RECORDS', payload: mockMedicalRecords });
      dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
      dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
      dispatch({ type: 'SET_PHARMACIES', payload: mockPharmacies });
      dispatch({ type: 'SET_VACCINATIONS', payload: mockVaccinations });
    } else {
      throw new Error(response.error || 'Signup failed');
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    logout,
    login,
    signup
  };
}