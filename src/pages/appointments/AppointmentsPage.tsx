// Helper to download .ics file for calendar integration
function downloadICS(appointment: any) {
  const dtStart = appointment.date.replace(/-/g, '') + 'T' + appointment.time.replace(':', '') + '00Z';
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Rendez-vous: ${appointment.doctorName}\nDTSTART:${dtStart}\nDESCRIPTION:${appointment.notes || ''}\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `appointment-${appointment.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
import React, { useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Calendar, Clock, MapPin, Phone, Plus, User, CreditCard, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import BookAppointmentForm from './BookAppointmentForm'

export default function AppointmentsPage() {
  const { state, dispatch } = useAppContext()
  const [selectedTab, setSelectedTab] = useState('upcoming')
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const user = state.user
  const isDoctor = user?.role === 'doctor'

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Confirmé</Badge>
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="w-3 h-3 mr-1" />Planifié</Badge>
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700"><CheckCircle className="w-3 h-3 mr-1" />Terminé</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Annulé</Badge>
      default:
        return <Badge><AlertCircle className="w-3 h-3 mr-1" />Inconnu</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Badge variant="outline">Consultation</Badge>
      case 'emergency':
        return <Badge className="bg-red-50 text-red-600 border-red-200">Urgence</Badge>
      case 'followup':
        return <Badge className="bg-blue-50 text-blue-600 border-blue-200">Suivi</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Filter appointments based on user role
  const allUserAppointments = isDoctor
    ? state.appointments.filter(apt => apt.doctorId === user?.id)
    : state.appointments

  const upcomingAppointments = allUserAppointments.filter(apt =>
    apt.status !== 'completed' && apt.status !== 'cancelled' && new Date(apt.date) >= new Date()
  )

  const pastAppointments = allUserAppointments.filter(apt =>
    apt.status === 'completed' || new Date(apt.date) < new Date()
  )

  const cancelledAppointments = allUserAppointments.filter(apt => apt.status === 'cancelled')

  const sendMedicalReport = (appointment: any) => {
    const newRecord: any = {
      id: `record-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'consultation',
      doctorName: user?.firstName + ' ' + user?.lastName,
      title: `Rapport de consultation - ${appointment.date}`,
      description: `Rapport médical pour la consultation du ${appointment.date} à ${appointment.time}.`,
      files: []
    }
    dispatch({ type: 'ADD_MEDICAL_RECORD', payload: newRecord })
    alert('Rapport médical envoyé avec succès!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isDoctor ? 'Rendez-vous des Patients' : 'Mes Rendez-vous'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isDoctor
              ? 'Gérez les consultations de vos patients et envoyez des rapports médicaux'
              : 'Gérez vos consultations médicales et prenez de nouveaux rendez-vous'
            }
          </p>
        </div>

        {!isDoctor && (
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau rendez-vous
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Prendre un nouveau rendez-vous</DialogTitle>
                <DialogDescription>
                  Choisissez un professionnel de santé et planifiez votre consultation
                </DialogDescription>
              </DialogHeader>
              <BookAppointmentForm onClose={() => setIsBookingOpen(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                <p className="text-sm text-gray-600">À venir</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{pastAppointments.length}</p>
                <p className="text-sm text-gray-600">Terminés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{cancelledAppointments.length}</p>
                <p className="text-sm text-gray-600">Annulés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {formatPrice(state.appointments.reduce((sum, apt) => sum + apt.price, 0))}
                </p>
                <p className="text-sm text-gray-600">Total dépensé</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">À venir ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Historique ({pastAppointments.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Annulés ({cancelledAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun rendez-vous à venir</h3>
                <p className="text-gray-600 mb-4">Planifiez votre prochaine consultation avec un professionnel de santé</p>
                <Button onClick={() => setIsBookingOpen(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Prendre rendez-vous
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                        {getStatusBadge(appointment.status)}
                        {getTypeBadge(appointment.type)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: fr })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{appointment.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4" />
                          <span>{formatPrice(appointment.price)}</span>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 md:ml-6">
                      {isDoctor ? (
                        <>
                          {appointment.status === 'scheduled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => dispatch({ type: 'UPDATE_APPOINTMENT', payload: { id: appointment.id, updates: { status: 'confirmed' } } })}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirmer
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => dispatch({ type: 'UPDATE_APPOINTMENT', payload: { id: appointment.id, updates: { status: 'cancelled' } } })}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Annuler
                          </Button>
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => sendMedicalReport(appointment)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Envoyer rapport
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            Contacter
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            <XCircle className="w-4 h-4 mr-2" />
                            Annuler
                          </Button>
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => downloadICS(appointment)}>
                            Ajouter au calendrier
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastAppointments.map((appointment) => (
            <Card key={appointment.id} className="opacity-80">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                      {getStatusBadge(appointment.status)}
                      {getTypeBadge(appointment.type)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: fr })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{appointment.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>{formatPrice(appointment.price)}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 md:ml-6">
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                    <Button variant="outline" size="sm">
                      Reprendre RDV
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => downloadICS(appointment)}>
                      Ajouter au calendrier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledAppointments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <XCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun rendez-vous annulé</h3>
                <p className="text-gray-600">Tous vos rendez-vous ont été honorés</p>
              </CardContent>
            </Card>
          ) : (
            cancelledAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: fr })} à {appointment.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Reprendre RDV
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => downloadICS(appointment)}>
                      Ajouter au calendrier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}