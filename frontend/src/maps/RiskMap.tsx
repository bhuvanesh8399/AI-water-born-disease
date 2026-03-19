import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { HeatmapPoint } from '../types/api'
import 'leaflet/dist/leaflet.css'

export function RiskMap({ items }: { items: HeatmapPoint[] }) {
  return (
    <div style={{ height: 420, borderRadius: 18, overflow: 'hidden' }}>
      <MapContainer center={[11.1, 78.5]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {items.map((item) => (
          <Marker key={item.district_code} position={[item.latitude, item.longitude]}>
            <Popup>
              <strong>{item.district_name}</strong>
              <div>Risk score: {item.risk_score}</div>
              <div>Level: {item.risk_level}</div>
              <div>Confidence: {item.confidence_score}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
