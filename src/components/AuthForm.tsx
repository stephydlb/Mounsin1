

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  onAuthSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient'); // New state for role
  const [clinicName, setClinicName] = useState(''); // New state for clinic name
  const [position, setPosition] = useState(''); // New state for position
  const [specialty, setSpecialty] = useState(''); // New state for specialty
  const { login, register, isLoading } = useAuth(); // Added register
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        // Registration logic
        const userData = {
          email,
          password,
          role,
          ...(role === 'doctor' && { clinicName, position, specialty }),
        };
        await register(userData);
      }
      if (onAuthSuccess) onAuthSuccess();
      navigate('/fr/dashboard');
    } catch (err: any) {
      setError('Échec de l\'authentification.');
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
            <select
              className="w-full border rounded px-3 py-2"
              value={role}
              onChange={e => setRole(e.target.value as 'patient' | 'doctor')}
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Médecin</option>
            </select>

            {role === 'doctor' && (
              <>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Nom de la clinique/hôpital"
                  value={clinicName}
                  onChange={e => setClinicName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Poste"
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Spécialité"
                  value={specialty}
                  onChange={e => setSpecialty(e.target.value)}
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
