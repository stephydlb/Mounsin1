import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthGuard } from '@/components/AuthGuard'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import LoginPage from './auth/LoginPage'
import HomePage from './HomePage'
import DashboardPage from './DashboardPage'
import AppointmentsPage from './appointments/AppointmentsPage'
import MedicalRecordsPage from './medical-records/MedicalRecordsPage'
import NotificationsPage from './notifications/NotificationsPage'
import DoctorsPage from './doctors/DoctorsPage'
import PharmaciesPage from './pharmacies/PharmaciesPage'
import ProfilePage from './profile/ProfilePage'
import SettingsPage from './settings/SettingsPage'
import VaccinationsPage from './vaccinations/VaccinationsPage'
import OpenAIBotPopup from '@/components/OpenAIBotPopup'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OpenAIBotPopup />
      <Routes>
        {/* Redirect root to French locale */}
        <Route path="/" element={<Navigate to="/fr" replace />} />
        
        {/* French locale routes */}
  <Route path="/fr" element={<HomePage />} />
        <Route path="/fr/auth/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route
          path="/fr/dashboard/*"
          element={
            <AuthGuard>
              <div className="flex h-screen overflow-hidden">
                {/* Desktop sidebar */}
                <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
                  <Sidebar />
                </div>
                
                {/* Main content area */}
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header title="Tableau de bord" />
                  <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Routes>
                      <Route index element={<DashboardPage />} />
                      <Route path="appointments" element={<AppointmentsPage />} />
                      <Route path="medical-records" element={<MedicalRecordsPage />} />
                      <Route path="notifications" element={<NotificationsPage />} />
                      <Route path="doctors" element={<DoctorsPage />} />
                      <Route path="pharmacies" element={<PharmaciesPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="settings" element={<SettingsPage />} />
                      <Route path="vaccinations" element={<VaccinationsPage />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </AuthGuard>
          }
        />
      </Routes>
    </div>
  )
}

export default App