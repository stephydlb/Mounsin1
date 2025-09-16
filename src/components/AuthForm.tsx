

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  onAuthSuccess?: () => void;
}

type AccountType = 'client' | 'medecin';

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState<AccountType>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [hospital, setHospital] = useState('');
  const { login, signup, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (accountType === 'client') {
          const userData = {
            email,
            firstName,
            lastName,
            phone,
            dateOfBirth: '1990-01-01', // Default
            address: 'Test Address', // Default
            city: 'Test City', // Default
            medicalId: `MED${Date.now()}`, // Generate unique
            emergencyContact: {
              name: 'Emergency Contact',
              phone: '987654321',
              relationship: 'Friend'
            }
          };
          await signup(userData);
        } else if (accountType === 'medecin') {
          // For doctors, create via doctors API
          const doctorData = {
            firstName,
            lastName,
            specialty,
            hospital,
            phone,
            email,
            rating: 4.5, // Default
            experience: 5, // Default
            location: {
              address: 'Test Address',
              city: 'Test City',
              coordinates: { lat: 0, lng: 0 }
            },
            availability: [] // Default
          };
          // Note: Need to add doctor signup to useAuth or call API directly
          // For now, alert
          alert('Doctor signup not implemented yet');
        }
      }
      if (onAuthSuccess) onAuthSuccess();
      navigate('/fr/dashboard');
    } catch (err: any) {
      setError(isLogin ? 'Échec de la connexion.' : 'Échec de l\'inscription.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Connexion' : 'Créer un compte'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Prénom"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Nom"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              placeholder="Téléphone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            {accountType === 'medecin' && (
              <>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Spécialité"
                  value={specialty}
                  onChange={e => setSpecialty(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Hôpital"
                  value={hospital}
                  onChange={e => setHospital(e.target.value)}
                  required
                />
              </>
            )}
          </>
        )}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded" disabled={isLoading}>
          {isLoading ? 'Chargement...' : isLogin ? 'Se connecter' : 'Créer un compte'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button className="text-indigo-600 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Créer un compte" : "J'ai déjà un compte"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
