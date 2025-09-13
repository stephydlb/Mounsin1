import React, { useState } from 'react'
import { useAppContext, Appointment } from '@/contexts/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Star, MapPin, Phone, CreditCard } from 'lucide-react'
import { format, addDays, isBefore, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale'

interface BookAppointmentFormProps {
  onClose: () => void
}

export default function BookAppointmentForm({ onClose }: BookAppointmentFormProps) {
  const { state, dispatch } = useAppContext()
  const [selectedDoctor, setSelectedDoctor] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [appointmentType, setAppointmentType] = useState<string>('consultation')
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const doctor = state.doctors.find(d => d.id === selectedDoctor)
  
  // Generate next 30 days for booking (excluding past dates)
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = addDays(new Date(), i)
    return {
      date: format(date, 'yyyy-MM-dd'),
      display: format(date, 'EEEE d MMMM', { locale: fr }),
      isPast: isBefore(date, startOfDay(new Date()))
    }
  }).filter(d => !d.isPast)

  // Get available time slots for selected doctor and date
  const getAvailableSlots = () => {
    if (!doctor || !selectedDate) return []
    
    const date = new Date(selectedDate)
    const dayName = format(date, 'EEEE', { locale: fr })
    
    const availability = doctor.availability.find(a => a.day === dayName)
    if (!availability) return []
    
    // Filter out already booked slots (simplified)
    return availability.slots.filter(slot => {
      const existingAppointment = state.appointments.find(apt =>
        apt.doctorId === doctor.id &&
        apt.date === selectedDate &&
        apt.time === slot &&
        apt.status !== 'cancelled'
      )
      return !existingAppointment
    })
  }

  const availableSlots = getAvailableSlots()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!doctor || !selectedDate || !selectedTime) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        doctorId: doctor.id,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        specialty: doctor.specialty,
        date: selectedDate,
        time: selectedTime,
        status: 'scheduled',
        type: appointmentType as 'consultation' | 'emergency' | 'followup',
        location: doctor.hospital,
        notes: notes.trim() || undefined,
        price: appointmentType === 'emergency' ? 35000 : appointmentType === 'followup' ? 20000 : 25000
      }

      dispatch({ type: 'ADD_APPOINTMENT', payload: newAppointment })
      onClose()
    } catch (error) {
      console.error('Error booking appointment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTypePrice = (type: string) => {
    switch (type) {
      case 'emergency': return 35000
      case 'followup': return 20000
      default: return 25000
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Doctor Selection */}
      <div className="space-y-2">
        <Label htmlFor="doctor">Choisir un professionnel de santé *</Label>
        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un médecin" />
          </SelectTrigger>
          <SelectContent>
            {state.doctors.map((doc) => (
              <SelectItem key={doc.id} value={doc.id}>
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="font-medium">{doc.firstName} {doc.lastName}</p>
                    <p className="text-sm text-gray-500">{doc.specialty} - {doc.hospital}</p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Doctor Details */}
      {doctor && (
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{doctor.firstName} {doctor.lastName}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{doctor.rating}/5 ({doctor.experience} ans d'expérience)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appointment Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Type de consultation *</Label>
        <Select value={appointmentType} onValueChange={setAppointmentType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consultation">
              <div className="flex items-center justify-between w-full">
                <span>Consultation générale</span>
                <Badge variant="outline" className="ml-2">{formatPrice(25000)}</Badge>
              </div>
            </SelectItem>
            <SelectItem value="followup">
              <div className="flex items-center justify-between w-full">
                <span>Consultation de suivi</span>
                <Badge variant="outline" className="ml-2">{formatPrice(20000)}</Badge>
              </div>
            </SelectItem>
            <SelectItem value="emergency">
              <div className="flex items-center justify-between w-full">
                <span>Consultation urgente</span>
                <Badge variant="outline" className="ml-2 text-red-600">{formatPrice(35000)}</Badge>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <Label htmlFor="date">Choisir une date *</Label>
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une date" />
          </SelectTrigger>
          <SelectContent>
            {availableDates.map((date) => (
              <SelectItem key={date.date} value={date.date}>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="capitalize">{date.display}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Time Selection */}
      {selectedDate && doctor && (
        <div className="space-y-2">
          <Label htmlFor="time">Choisir un créneau *</Label>
          {availableSlots.length > 0 ? (
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un horaire" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{slot}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="p-3 text-center text-gray-500 bg-gray-50 rounded-lg">
              Aucun créneau disponible pour cette date
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes complémentaires (optionnel)</Label>
        <Textarea
          id="notes"
          placeholder="Décrivez vos symptômes ou ajoutez des informations importantes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {/* Price Summary */}
      {appointmentType && (
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span className="font-medium">Coût de la consultation</span>
              </div>
              <div className="text-lg font-bold text-green-600">
                {formatPrice(getTypePrice(appointmentType))}
              </div>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Paiement à effectuer sur place ou via mobile money
            </p>
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={!doctor || !selectedDate || !selectedTime || isLoading}
          className="bg-green-600 hover:bg-green-700"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Confirmation...
            </>
          ) : (
            'Confirmer le rendez-vous'
          )}
        </Button>
      </div>
    </form>
  )
}