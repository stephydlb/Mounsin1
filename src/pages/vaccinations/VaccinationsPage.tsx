import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VaccinationsPage: React.FC = () => {
  const { state } = useAppContext();
  const vaccinations = state.vaccinations;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Mes vaccinations</h2>
      {vaccinations.length === 0 ? (
        <p className="text-gray-500">Aucune vaccination enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {vaccinations.map(vacc => (
            <Card key={vacc.id}>
              <CardHeader>
                <CardTitle>{vacc.name}</CardTitle>
                <div className="text-sm text-gray-500">{vacc.date} — Lot : {vacc.batch}</div>
              </CardHeader>
              <CardContent>
                {vacc.nextDose && <div className="text-sm">Prochaine dose : {vacc.nextDose}</div>}
                <div className="text-sm">Lieu : {vacc.location}</div>
                {vacc.notes && <div className="text-sm">Notes : {vacc.notes}</div>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VaccinationsPage;
