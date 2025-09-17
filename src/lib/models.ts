import mongoose, { Document, Schema } from 'mongoose';

// User Model
export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  role: 'patient' | 'doctor';
  medicalId?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  clinicName?: string;
  position?: string;
  specialty?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  medicalId: { type: String },
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
    relationship: { type: String },
  },
  clinicName: { type: String },
  position: { type: String },
  specialty: { type: String },
}, {
  timestamps: true,
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// Doctor Model
export interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  specialty: string;
  hospital: string;
  phone: string;
  email: string;
  rating: number;
  experience: number;
  location: {
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  availability: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialty: { type: String, required: true },
  hospital: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rating: { type: Number, default: 4.5 },
  experience: { type: Number, default: 5 },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  availability: [{ type: String }],
}, {
  timestamps: true,
});

export const Doctor = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

// Appointment Model
export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  reason: { type: String, required: true },
  notes: { type: String },
}, {
  timestamps: true,
});

export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

// Medical Record Model
export interface IMedicalRecord extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: Date;
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MedicalRecordSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  medications: [{ type: String }],
  notes: { type: String, required: true },
  attachments: [{ type: String }],
}, {
  timestamps: true,
});

export const MedicalRecord = mongoose.models.MedicalRecord || mongoose.model<IMedicalRecord>('MedicalRecord', MedicalRecordSchema);

// Notification Model
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'appointment' | 'reminder' | 'alert' | 'general';
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['appointment', 'reminder', 'alert', 'general'], default: 'general' },
  read: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

// Pharmacy Model
export interface IPharmacy extends Document {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  openingHours: string;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PharmacySchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  openingHours: { type: String, required: true },
  services: [{ type: String }],
}, {
  timestamps: true,
});

export const Pharmacy = mongoose.models.Pharmacy || mongoose.model<IPharmacy>('Pharmacy', PharmacySchema);

// Vaccination Model
export interface IVaccination extends Document {
  patientId: mongoose.Types.ObjectId;
  vaccineName: string;
  dateAdministered: Date;
  dose: string;
  administeredBy: string;
  nextDueDate?: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const VaccinationSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vaccineName: { type: String, required: true },
  dateAdministered: { type: Date, required: true },
  dose: { type: String, required: true },
  administeredBy: { type: String, required: true },
  nextDueDate: { type: Date },
  notes: { type: String },
}, {
  timestamps: true,
});

export const Vaccination = mongoose.models.Vaccination || mongoose.model<IVaccination>('Vaccination', VaccinationSchema);
