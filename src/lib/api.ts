const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'An error occurred' };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// Users API
export const usersApi = {
  getAll: () => apiClient.get('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  create: (user: any) => apiClient.post('/users', user),
  update: (id: string, user: any) => apiClient.put(`/users/${id}`, user),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
};

// Doctors API
export const doctorsApi = {
  getAll: () => apiClient.get('/doctors'),
  getById: (id: string) => apiClient.get(`/doctors/${id}`),
  create: (doctor: any) => apiClient.post('/doctors', doctor),
  update: (id: string, doctor: any) => apiClient.put(`/doctors/${id}`, doctor),
  delete: (id: string) => apiClient.delete(`/doctors/${id}`),
};

// Appointments API
export const appointmentsApi = {
  getAll: () => apiClient.get('/appointments'),
  getById: (id: string) => apiClient.get(`/appointments/${id}`),
  create: (appointment: any) => apiClient.post('/appointments', appointment),
  update: (id: string, appointment: any) => apiClient.put(`/appointments/${id}`, appointment),
  delete: (id: string) => apiClient.delete(`/appointments/${id}`),
};

// Medical Records API
export const medicalRecordsApi = {
  getAll: () => apiClient.get('/medical-records'),
  getById: (id: string) => apiClient.get(`/medical-records/${id}`),
  create: (record: any) => apiClient.post('/medical-records', record),
  update: (id: string, record: any) => apiClient.put(`/medical-records/${id}`, record),
  delete: (id: string) => apiClient.delete(`/medical-records/${id}`),
};

// Notifications API
export const notificationsApi = {
  getAll: () => apiClient.get('/notifications'),
  getById: (id: string) => apiClient.get(`/notifications/${id}`),
  create: (notification: any) => apiClient.post('/notifications', notification),
  update: (id: string, notification: any) => apiClient.put(`/notifications/${id}`, notification),
  delete: (id: string) => apiClient.delete(`/notifications/${id}`),
};

// Pharmacies API
export const pharmaciesApi = {
  getAll: () => apiClient.get('/pharmacies'),
  getById: (id: string) => apiClient.get(`/pharmacies/${id}`),
  create: (pharmacy: any) => apiClient.post('/pharmacies', pharmacy),
  update: (id: string, pharmacy: any) => apiClient.put(`/pharmacies/${id}`, pharmacy),
  delete: (id: string) => apiClient.delete(`/pharmacies/${id}`),
};

// Vaccinations API
export const vaccinationsApi = {
  getAll: () => apiClient.get('/vaccinations'),
  getById: (id: string) => apiClient.get(`/vaccinations/${id}`),
  create: (vaccination: any) => apiClient.post('/vaccinations', vaccination),
  update: (id: string, vaccination: any) => apiClient.put(`/vaccinations/${id}`, vaccination),
  delete: (id: string) => apiClient.delete(`/vaccinations/${id}`),
};
