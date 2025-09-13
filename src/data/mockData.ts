import { User, Appointment, MedicalRecord, Notification, Doctor, Pharmacy, Vaccination } from '../contexts/AppContext'

// Mock user data
export const mockUser: User = {
  id: '1',
  email: 'jean.mvou@example.com',
  firstName: 'Jean-Baptiste',
  lastName: 'Mvou Ayissi',
  phone: '+241 06 12 34 56',
  dateOfBirth: '1985-03-15',
  address: '123 Avenue Bouet',
  city: 'Libreville',
  medicalId: 'GAB123456789',
  emergencyContact: {
    name: 'Marie Mvou',
    phone: '+241 06 98 76 54',
    relationship: 'Épouse'
  }
}

// Mock doctors
export const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'Dr. Paulette',
    lastName: 'Nzamba',
    specialty: 'Cardiologie',
    hospital: 'Centre Hospitalier Universitaire de Libreville',
    phone: '+241 01 11 11 11',
    email: 'p.nzamba@chul.ga',
    rating: 4.8,
    experience: 15,
    location: {
      address: 'BP 2228 Libreville',
      city: 'Libreville',
      coordinates: { lat: 0.4162, lng: 9.4673 }
    },
    availability: [
      { day: 'Lundi', slots: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
      { day: 'Mardi', slots: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
      { day: 'Mercredi', slots: ['08:00', '09:00', '10:00'] },
      { day: 'Jeudi', slots: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
      { day: 'Vendredi', slots: ['08:00', '09:00', '10:00', '14:00'] }
    ]
  },
  {
    id: '2',
    firstName: 'Dr. Michel',
    lastName: 'Obame',
    specialty: 'Médecine Générale',
    hospital: 'Clinique Sainte-Marie',
    phone: '+241 01 22 22 22',
    email: 'm.obame@sainte-marie.ga',
    rating: 4.6,
    experience: 12,
    location: {
      address: 'Quartier Louis, Libreville',
      city: 'Libreville',
      coordinates: { lat: 0.4037, lng: 9.4531 }
    },
    availability: [
      { day: 'Lundi', slots: ['07:30', '08:30', '09:30', '10:30', '14:30', '15:30'] },
      { day: 'Mardi', slots: ['07:30', '08:30', '09:30', '10:30', '14:30', '15:30'] },
      { day: 'Mercredi', slots: ['07:30', '08:30', '09:30', '10:30'] },
      { day: 'Jeudi', slots: ['07:30', '08:30', '09:30', '10:30', '14:30', '15:30'] },
      { day: 'Vendredi', slots: ['07:30', '08:30', '09:30', '10:30'] },
      { day: 'Samedi', slots: ['08:00', '09:00', '10:00'] }
    ]
  },
  {
    id: '3',
    firstName: 'Dr. Françoise',
    lastName: 'Minko',
    specialty: 'Pédiatrie',
    hospital: 'Hôpital Pédiatrique Omar Bongo',
    phone: '+241 01 33 33 33',
    email: 'f.minko@hopital-pediatrique.ga',
    rating: 4.9,
    experience: 18,
    location: {
      address: 'Owendo, Libreville',
      city: 'Libreville',
      coordinates: { lat: 0.3475, lng: 9.5025 }
    },
    availability: [
      { day: 'Lundi', slots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'Mardi', slots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'Mercredi', slots: ['08:00', '09:00', '10:00', '11:00'] },
      { day: 'Jeudi', slots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'Vendredi', slots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'] }
    ]
  },
  {
    id: '4',
    firstName: 'Dr. André',
    lastName: 'Bissielo',
    specialty: 'Orthopédie',
    hospital: 'Centre Médico-Chirurgical El Rapha',
    phone: '+241 01 44 44 44',
    email: 'a.bissielo@elrapha.ga',
    rating: 4.7,
    experience: 20,
    location: {
      address: 'PK8, Libreville',
      city: 'Libreville',
      coordinates: { lat: 0.4521, lng: 9.4123 }
    },
    availability: [
      { day: 'Lundi', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: 'Mardi', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: 'Mercredi', slots: ['09:00', '10:00', '11:00'] },
      { day: 'Jeudi', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: 'Vendredi', slots: ['09:00', '10:00', '11:00'] }
    ]
  }
]

// Mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Paulette Nzamba',
    specialty: 'Cardiologie',
    date: '2025-01-15',
    time: '10:00',
    status: 'confirmed',
    type: 'consultation',
    location: 'Centre Hospitalier Universitaire de Libreville',
    notes: 'Consultation de routine - contrôle tension artérielle',
    price: 25000
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Michel Obame',
    specialty: 'Médecine Générale',
    date: '2025-01-18',
    time: '14:30',
    status: 'scheduled',
    type: 'consultation',
    location: 'Clinique Sainte-Marie',
    price: 15000
  },
  {
    id: '3',
    doctorId: '3',
    doctorName: 'Dr. Françoise Minko',
    specialty: 'Pédiatrie',
    date: '2025-01-10',
    time: '09:00',
    status: 'completed',
    type: 'followup',
    location: 'Hôpital Pédiatrique Omar Bongo',
    notes: 'Suivi vaccination - tout va bien',
    price: 20000
  }
]

// Mock medical records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    date: '2025-01-10',
    type: 'consultation',
    doctorName: 'Dr. Françoise Minko',
    title: 'Consultation pédiatrique',
    description: 'Examen de routine. Enfant en bonne santé. Poids et taille dans les normes. Vaccinations à jour.'
  },
  {
    id: '2',
    date: '2025-01-05',
    type: 'test_result',
    doctorName: 'Dr. Paulette Nzamba',
    title: 'Résultats analyses sanguines',
    description: 'Analyses complètes: Glycémie normale (0.95g/L), Cholestérol légèrement élevé (2.3g/L), Triglycérides normaux.',
    files: [
      { name: 'analyses_sang_05012025.pdf', url: '#', type: 'pdf' }
    ]
  },
  {
    id: '3',
    date: '2024-12-20',
    type: 'prescription',
    doctorName: 'Dr. Michel Obame',
    title: 'Prescription médicaments',
    description: 'Paracétamol 1g x3/jour pendant 5 jours. Repos recommandé. Consultation de contrôle si symptômes persistent.'
  },
  {
    id: '4',
    date: '2024-11-15',
    type: 'vaccination',
    doctorName: 'Infirmière Chef Marie Ngoma',
    title: 'Vaccination COVID-19 (Rappel)',
    description: 'Administration du rappel COVID-19. Vaccin Pfizer-BioNTech. Aucune réaction indésirable observée.',
    files: [
      { name: 'certificat_vaccination.pdf', url: '#', type: 'pdf' }
    ]
  }
]

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Rappel de rendez-vous',
    message: 'Votre rendez-vous avec Dr. Paulette Nzamba est demain à 10h00.',
    type: 'appointment',
    read: false,
    date: '2025-01-14T08:00:00Z',
    actionUrl: '/fr/dashboard/appointments'
  },
  {
    id: '2',
    title: 'Résultats disponibles',
    message: 'Vos résultats d\'analyses sont maintenant disponibles.',
    type: 'result',
    read: false,
    date: '2025-01-13T14:30:00Z',
    actionUrl: '/fr/dashboard/medical-records'
  },
  {
    id: '3',
    title: 'Vaccination rappel',
    message: 'Il est temps de faire votre rappel de vaccination contre la fièvre jaune.',
    type: 'reminder',
    read: true,
    date: '2025-01-12T10:00:00Z',
    actionUrl: '/fr/dashboard/vaccinations'
  },
  {
    id: '4',
    title: 'Nouvelle fonctionnalité',
    message: 'Découvrez notre nouveau service de téléconsultation !',
    type: 'appointment',
    read: true,
    date: '2025-01-11T16:00:00Z'
  }
]

// Mock pharmacies
export const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Pharmacie du Centre',
    address: 'Avenue du Colonel Parant, Libreville',
    city: 'Libreville',
    phone: '+241 01 77 77 77',
    hours: '07:00 - 22:00',
    isOpen24h: false,
    coordinates: { lat: 0.4162, lng: 9.4673 },
    hasDelivery: true,
    services: ['Médicaments sur ordonnance', 'Parapharmacie', 'Conseils pharmaceutiques', 'Livraison à domicile']
  },
  {
    id: '2',
    name: 'Pharmacie de la Baie',
    address: 'Boulevard de la Mer, Libreville',
    city: 'Libreville',
    phone: '+241 01 88 88 88',
    hours: '24h/24 - 7j/7',
    isOpen24h: true,
    coordinates: { lat: 0.4037, lng: 9.4531 },
    hasDelivery: true,
    services: ['Urgences 24h/24', 'Médicaments', 'Tests rapides', 'Matériel médical', 'Livraison']
  },
  {
    id: '3',
    name: 'Pharmacie Sainte-Marie',
    address: 'Quartier Louis, Libreville',
    city: 'Libreville',
    phone: '+241 01 99 99 99',
    hours: '08:00 - 20:00',
    isOpen24h: false,
    coordinates: { lat: 0.3875, lng: 9.4425 },
    hasDelivery: false,
    services: ['Médicaments traditionnels', 'Homéopathie', 'Produits naturels', 'Conseils santé']
  },
  {
    id: '4',
    name: 'Pharmacie Owendo',
    address: 'Centre Commercial Owendo',
    city: 'Libreville',
    phone: '+241 01 66 66 66',
    hours: '09:00 - 19:00',
    isOpen24h: false,
    coordinates: { lat: 0.3475, lng: 9.5025 },
    hasDelivery: true,
    services: ['Médicaments', 'Cosmétiques', 'Bébé-enfant', 'Orthopédie']
  }
]

// Mock vaccinations
export const mockVaccinations: Vaccination[] = [
  {
    id: '1',
    name: 'COVID-19 (Pfizer)',
    date: '2024-11-15',
    nextDose: '2025-11-15',
    batch: 'FF2847',
    location: 'Centre de Vaccination COVID - Libreville',
    notes: 'Rappel annuel recommandé'
  },
  {
    id: '2',
    name: 'Fièvre Jaune',
    date: '2020-03-10',
    nextDose: '2030-03-10',
    batch: 'YF1234',
    location: 'Institut Pasteur du Gabon',
    notes: 'Valable 10 ans - Certificat international délivré'
  },
  {
    id: '3',
    name: 'Tétanos-Diphtérie-Poliomyélite',
    date: '2023-06-20',
    nextDose: '2033-06-20',
    batch: 'TDP789',
    location: 'Centre de Santé Nzeng-Ayong',
    notes: 'Rappel tous les 10 ans'
  },
  {
    id: '4',
    name: 'Hépatite B',
    date: '2019-01-15',
    batch: 'HEP456',
    location: 'Hôpital Principal de Libreville',
    notes: 'Série complète terminée - Protection à vie'
  },
  {
    id: '5',
    name: 'Méningite',
    date: '2024-08-12',
    nextDose: '2027-08-12',
    batch: 'MEN123',
    location: 'Clinique Sainte-Marie',
    notes: 'Recommandé pour les voyages en zone d\'endémie'
  }
]