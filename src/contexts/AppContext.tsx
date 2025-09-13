import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  avatar?: string
  medicalId: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

export interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed'
  type: 'consultation' | 'emergency' | 'followup'
  location: string
  notes?: string
  price: number
}

export interface MedicalRecord {
  id: string
  date: string
  type: 'consultation' | 'prescription' | 'test_result' | 'vaccination'
  doctorName: string
  title: string
  description: string
  files?: Array<{
    name: string
    url: string
    type: string
  }>
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'appointment' | 'result' | 'reminder' | 'emergency'
  read: boolean
  date: string
  actionUrl?: string
}

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialty: string
  hospital: string
  phone: string
  email: string
  avatar?: string
  rating: number
  experience: number
  location: {
    address: string
    city: string
    coordinates: { lat: number; lng: number }
  }
  availability: Array<{
    day: string
    slots: string[]
  }>
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  city: string
  phone: string
  hours: string
  isOpen24h: boolean
  coordinates: { lat: number; lng: number }
  hasDelivery: boolean
  services: string[]
}

export interface Vaccination {
  id: string
  name: string
  date: string
  nextDose?: string
  batch: string
  location: string
  notes?: string
}

// State interface
export interface AppState {
  user: User | null
  appointments: Appointment[]
  medicalRecords: MedicalRecord[]
  notifications: Notification[]
  doctors: Doctor[]
  pharmacies: Pharmacy[]
  vaccinations: Vaccination[]
  isLoading: boolean
  searchQuery: string
}

// Action types
export type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_APPOINTMENTS'; payload: Appointment[] }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: { id: string; updates: Partial<Appointment> } }
  | { type: 'SET_MEDICAL_RECORDS'; payload: MedicalRecord[] }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_DOCTORS'; payload: Doctor[] }
  | { type: 'SET_PHARMACIES'; payload: Pharmacy[] }
  | { type: 'SET_VACCINATIONS'; payload: Vaccination[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }

// Initial state
const initialState: AppState = {
  user: null,
  appointments: [],
  medicalRecords: [],
  notifications: [],
  doctors: [],
  pharmacies: [],
  vaccinations: [],
  isLoading: false,
  searchQuery: ''
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload }
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] }
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload.id
            ? { ...apt, ...action.payload.updates }
            : apt
        )
      }
    case 'SET_MEDICAL_RECORDS':
      return { ...state, medicalRecords: action.payload }
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload }
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload
            ? { ...notif, read: true }
            : notif
        )
      }
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload }
    case 'SET_PHARMACIES':
      return { ...state, pharmacies: action.payload }
    case 'SET_VACCINATIONS':
      return { ...state, vaccinations: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook to use context
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}