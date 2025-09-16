// API base URL - will be different in development vs production
const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error || 'API call failed' }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// Users API
export const usersApi = {
  getAll: () => apiCall('/users'),
  create: (user: any) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
  update: (id: string, user: any) => apiCall(`/users?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  }),
}

// Doctors API
export const doctorsApi = {
  getAll: (params?: { city?: string; specialty?: string }) => {
    const query = params ? new URLSearchParams(params).toString() : ''
    return apiCall(`/doctors${query ? `?${query}` : ''}`)
  },
  create: (doctor: any) => apiCall('/doctors', {
    method: 'POST',
    body: JSON.stringify(doctor),
  }),
}

// Appointments API
export const appointmentsApi = {
  getAll: (userId?: string) => apiCall(`/appointments${userId ? `?userId=${userId}` : ''}`),
  create: (appointment: any) => apiCall('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointment),
  }),
  update: (id: string, updates: any) => apiCall(`/appointments?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
}

// Medical Records API
export const medicalRecordsApi = {
  getAll: (userId?: string) => apiCall(`/medical-records${userId ? `?userId=${userId}` : ''}`),
  create: (record: any) => apiCall('/medical-records', {
    method: 'POST',
    body: JSON.stringify(record),
  }),
}

// Notifications API
export const notificationsApi = {
  getAll: (userId?: string) => apiCall(`/notifications${userId ? `?userId=${userId}` : ''}`),
  create: (notification: any) => apiCall('/notifications', {
    method: 'POST',
    body: JSON.stringify(notification),
  }),
  markRead: (id: string) => apiCall(`/notifications?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify({ read: true }),
  }),
}

// Pharmacies API
export const pharmaciesApi = {
  getAll: (params?: { city?: string }) => {
    const query = params ? new URLSearchParams(params).toString() : ''
    return apiCall(`/pharmacies${query ? `?${query}` : ''}`)
  },
  create: (pharmacy: any) => apiCall('/pharmacies', {
    method: 'POST',
    body: JSON.stringify(pharmacy),
  }),
}

// Vaccinations API
export const vaccinationsApi = {
  getAll: (userId?: string) => apiCall(`/vaccinations${userId ? `?userId=${userId}` : ''}`),
  create: (vaccination: any) => apiCall('/vaccinations', {
    method: 'POST',
    body: JSON.stringify(vaccination),
  }),
}
