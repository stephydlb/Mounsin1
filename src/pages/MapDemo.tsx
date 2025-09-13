import React from 'react'
import LocationMap from '../components/LocationMap'
import { mockDoctors, mockPharmacies, mockFacilities } from '../data/mockData'

export default function MapDemo() {
  const doctorMarkers = mockDoctors.map(d => ({ id: `doc-${d.id}`, name: `Dr. ${d.firstName} ${d.lastName}`, address: d.location.address, city: d.location.city, coordinates: d.location.coordinates }))
  const pharmacyMarkers = mockPharmacies.map(p => ({ id: `ph-${p.id}`, name: p.name, address: p.address, city: p.city, coordinates: p.coordinates }))
  const facilityMarkers = mockFacilities.map(f => ({ id: `fac-${f.id}`, name: f.name, address: f.address, city: f.city, coordinates: f.coordinates }))

  const items = [...doctorMarkers, ...pharmacyMarkers, ...facilityMarkers]

  return (
    <div style={{ padding: 20 }}>
      <h1>Carte des établissements</h1>
      <LocationMap items={items} center={{ lat: 0.0, lng: 9.0 }} zoom={6} />
    </div>
  )
}
