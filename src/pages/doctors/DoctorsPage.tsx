import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DoctorsPage: React.FC = () => {
  const { state } = useAppContext();
  const [search, setSearch] = useState('');
  const doctors = state.doctors.filter(doc =>
    `${doc.firstName} ${doc.lastName} ${doc.specialty}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Annuaire des médecins</h2>
      <input
        type="text"
        placeholder="Rechercher par nom ou spécialité..."
        className="mb-6 w-full border rounded p-2"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {doctors.length === 0 ? (
        <p className="text-gray-500">Aucun médecin trouvé.</p>
      ) : (
        <div className="space-y-4">
          {doctors.map(doc => (
            <Card key={doc.id}>
              <CardHeader>
                <CardTitle>{doc.firstName} {doc.lastName}</CardTitle>
                <div className="text-sm text-gray-500">{doc.specialty} — {doc.hospital}</div>
              </CardHeader>
              <CardContent>
                <div className="text-sm">Téléphone : {doc.phone}</div>
                <div className="text-sm">Email : {doc.email}</div>
                <div className="text-sm">Expérience : {doc.experience} ans</div>
                <div className="text-sm">Ville : {doc.location.city}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
