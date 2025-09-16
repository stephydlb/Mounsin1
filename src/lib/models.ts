import mongoose, { Schema, Document } from 'mongoose'

// User interface and schema
export interface IUser extends Document {
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

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  avatar: { type: String },
  medicalId: { type: String, required: true, unique: true },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true }
  }
})

// Doctor interface and schema
export interface IDoctor extends Document {
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

const DoctorSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialty: { type: String, required: true },
  hospital: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, required: true },
  experience: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  availability: [{
    day: { type: String, required: true },
    slots: [{ type: String, required: true }]
  }]
})

// Appointment interface and schema
export interface IAppointment extends Document {
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
  userId: string // Reference to user
}

const AppointmentSchema: Schema = new Schema({
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  specialty: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true, enum: ['scheduled', 'completed', 'cancelled', 'confirmed'] },
  type: { type: String, required: true, enum: ['consultation', 'emergency', 'followup'] },
  location: { type: String, required: true },
  notes: { type: String },
  price: { type: Number, required: true },
  userId: { type: String, required: true }
})

// MedicalRecord interface and schema
export interface IMedicalRecord extends Document {
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
  userId: string // Reference to user
}

const MedicalRecordSchema: Schema = new Schema({
  date: { type: String, required: true },
  type: { type: String, required: true, enum: ['consultation', 'prescription', 'test_result', 'vaccination'] },
  doctorName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  files: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true }
  }],
  userId: { type: String, required: true }
})

// Notification interface and schema
export interface INotification extends Document {
  title: string
  message: string
  type: 'appointment' | 'result' | 'reminder' | 'emergency'
  read: boolean
  date: string
  actionUrl?: string
  userId: string // Reference to user
}

const NotificationSchema: Schema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, required: true, enum: ['appointment', 'result', 'reminder', 'emergency'] },
  read: { type: Boolean, required: true, default: false },
  date: { type: String, required: true },
  actionUrl: { type: String },
  userId: { type: String, required: true }
})

// Pharmacy interface and schema
export interface IPharmacy extends Document {
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

const PharmacySchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  hours: { type: String, required: true },
  isOpen24h: { type: Boolean, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  hasDelivery: { type: Boolean, required: true },
  services: [{ type: String, required: true }]
})

// Vaccination interface and schema
export interface IVaccination extends Document {
  name: string
  date: string
  nextDose?: string
  batch: string
  location: string
  notes?: string
  userId: string // Reference to user
}

const VaccinationSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  nextDose: { type: String },
  batch: { type: String, required: true },
  location: { type: String, required: true },
  notes: { type: String },
  userId: { type: String, required: true }
})

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const Doctor = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema)
export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema)
export const MedicalRecord = mongoose.models.MedicalRecord || mongoose.model<IMedicalRecord>('MedicalRecord', MedicalRecordSchema)
export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema)
export const Pharmacy = mongoose.models.Pharmacy || mongoose.model<IPharmacy>('Pharmacy', PharmacySchema)
export const Vaccination = mongoose.models.Vaccination || mongoose.model<IVaccination>('Vaccination', VaccinationSchema)
