import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '@/contexts/AppContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Activity, Users, FileText, Calendar, Bell, Plus, ArrowRight, Clock, CheckCircle } from 'lucide-react'
import { format, isToday, isTomorrow, isAfter } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function DashboardPage() {
  const { state } = useAppContext()
  
  // Calculate statistics from real data
  const upcomingAppointments = state.appointments.filter(apt => 
    apt.status !== 'completed' && apt.status !== 'cancelled' && 
    isAfter(new Date(apt.date), new Date())
  )
  
  const unreadNotifications = state.notifications.filter(notif => !notif.read)
  
  // Next appointment
  const nextAppointment = upcomingAppointments
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
  
  const stats = [
    {
      title: 'Rendez-vous',
      value: upcomingAppointments.length.toString(),
      description: 'À venir',
      icon: Calendar,
      trend: `${state.appointments.length} au total`,
      link: '/fr/dashboard/appointments'
    },
    {
      title: 'Dossiers médicaux',
      value: state.medicalRecords.length.toString(),
      description: 'Documents disponibles',
      icon: FileText,
      trend: 'Historique complet',
      link: '/fr/dashboard/medical-records'
    },
    {
      title: 'Professionnels',
      value: state.doctors.length.toString(),
      description: 'Dans votre réseau',
      icon: Users,
      trend: 'Médecins disponibles',
      link: '/fr/dashboard/doctors'
    },
    {
      title: 'Notifications',
      value: unreadNotifications.length.toString(),
      description: 'Non lues',
      icon: Bell,
      trend: `${state.notifications.length} au total`,
      link: '/fr/dashboard/notifications'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Bienvenue sur votre plateforme de santé personnalisée
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-600 mt-1">
                    {stat.description}
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    {stat.trend}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Next Appointment */}
      {nextAppointment && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Prochain rendez-vous</CardTitle>
            <CardDescription>Votre prochaine consultation programmée</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{nextAppointment.doctorName}</h3>
                <p className="text-green-600 font-medium">{nextAppointment.specialty}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isToday(new Date(nextAppointment.date)) 
                        ? "Aujourd'hui" 
                        : isTomorrow(new Date(nextAppointment.date))
                        ? "Demain"
                        : format(new Date(nextAppointment.date), 'EEEE d MMMM', { locale: fr })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{nextAppointment.time}</span>
                  </div>
                </div>
                {nextAppointment.notes && (
                  <p className="text-sm text-gray-700 mt-2 bg-white/50 p-2 rounded">
                    {nextAppointment.notes}
                  </p>
                )}
              </div>
              <div className="ml-4">
                <Link to="/fr/dashboard/appointments">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Voir détails
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Recent Notifications */}
      {unreadNotifications.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifications récentes</CardTitle>
              <CardDescription>{unreadNotifications.length} non lues</CardDescription>
            </div>
            <Badge className="bg-red-100 text-red-700">
              {unreadNotifications.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unreadNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(notification.date), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                    </p>
                  </div>
                </div>
              ))}
              {unreadNotifications.length > 3 && (
                <div className="text-center pt-2">
                  <Link to="/fr/dashboard/notifications">
                    <Button variant="outline" size="sm">
                      Voir toutes ({unreadNotifications.length})
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accédez rapidement aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/fr/dashboard/appointments">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Calendar className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold">Prendre rendez-vous</h3>
                <p className="text-sm text-gray-600">Planifier une consultation</p>
              </div>
            </Link>
            <Link to="/fr/dashboard/medical-records">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <FileText className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold">Mes documents</h3>
                <p className="text-sm text-gray-600">Consulter mon dossier médical</p>
              </div>
            </Link>
            <Link to="/fr/dashboard/doctors">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold">Mes professionnels</h3>
                <p className="text-sm text-gray-600">Contacter un professionnel</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}