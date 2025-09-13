
import React, { useState, useEffect } from 'react';
import { useAppContext, Pharmacy } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PharmacyWithDistance = Pharmacy & { distance?: number };

const PharmaciesPage: React.FC = () => {
  const { state } = useAppContext();
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Haversine formula for distance in km
  function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation(null)
      );
    }
  }, []);

  let pharmacies: PharmacyWithDistance[] = state.pharmacies.filter(pharm =>
    `${pharm.name} ${pharm.city}`.toLowerCase().includes(search.toLowerCase())
  );

  // If user location is available, add distance and sort by proximity
  if (userLocation) {
    pharmacies = pharmacies
      .map(pharm => ({
        ...pharm,
        distance: getDistance(userLocation.lat, userLocation.lng, pharm.coordinates.lat, pharm.coordinates.lng)
      }))
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
  <h2 className="text-2xl font-bold mb-6 text-indigo-700">Mounsin — Annuaire des pharmacies</h2>
      <input
        type="text"
        placeholder="Rechercher par nom ou ville..."
        className="mb-6 w-full border rounded p-2"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {userLocation ? (
        <div className="mb-4 text-green-700">Localisation activée : recherche par proximité</div>
      ) : (
        <div className="mb-4 text-yellow-700">Localisation non activée ou refusée</div>
      )}
      {pharmacies.length === 0 ? (
        <p className="text-gray-500">Aucune pharmacie trouvée.</p>
      ) : (
        <div className="space-y-4">
          {pharmacies.map((pharm) => (
            <Card key={pharm.id}>
              <CardHeader>
                <CardTitle>{pharm.name}</CardTitle>
                <div className="text-sm text-gray-500">{pharm.address} — {pharm.city}</div>
              </CardHeader>
              <CardContent>
                <div className="text-sm">Téléphone : {pharm.phone}</div>
                <div className="text-sm">Horaires : {pharm.hours}</div>
                <div className="text-sm">Ouverte 24h/24 : {pharm.isOpen24h ? 'Oui' : 'Non'}</div>
                <div className="text-sm">Livraison : {pharm.hasDelivery ? 'Oui' : 'Non'}</div>
                {userLocation && pharm.distance !== undefined && (
                  <div className="text-sm font-semibold text-blue-700 mt-2">Distance : {pharm.distance.toFixed(2)} km</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PharmaciesPage;
