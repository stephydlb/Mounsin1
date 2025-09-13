import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default function LocationMap({ items, center = { lat: 0, lng: 9.5 }, zoom = 6 } : { items: any[]; center?: { lat:number; lng:number }; zoom?: number }) {
  const colorForType = (type?: string) => {
    switch ((type || '').toLowerCase()) {
      case 'doctor':
      case 'médecin':
        return '#1e88e5' // blue
      case 'pharmacy':
      case 'pharmacie':
        return '#43a047' // green
      case 'laboratoire':
      case 'imagerie':
        return '#fb8c00' // orange
      default:
        return '#6d4c41' // brown
    }
  }

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={zoom} style={{ height: '70vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {items.map(item => {
        const coords = item.coordinates || (item.location && item.location.coordinates)
        if (!coords || typeof coords.lat !== 'number') return null
        const type = item.type || item.category || (item.id && String(item.id).startsWith('doc') ? 'doctor' : undefined)
        const color = colorForType(type)

        return (
          <CircleMarker key={item.id} center={[coords.lat, coords.lng]} pathOptions={{ color, fillColor: color, fillOpacity: 0.7 }} radius={8}>
            <Popup>
              <strong>{item.name || item.title || item.type}</strong><br />
              {item.address || (item.location && item.location.address)}<br />
              {item.city || (item.location && item.location.city)}
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
