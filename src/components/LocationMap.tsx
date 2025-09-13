import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default function LocationMap({ items, center = { lat: 0, lng: 9.5 }, zoom = 6 } : { items: any[]; center?: { lat:number; lng:number }; zoom?: number }) {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={zoom} style={{ height: '70vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {items.map(item => (
        <Marker key={item.id} position={[item.coordinates.lat, item.coordinates.lng]}>
          <Popup>
            <strong>{item.name || item.title || item.type}</strong><br />
            {item.address}<br />
            {item.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
