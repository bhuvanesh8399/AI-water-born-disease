import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Hotspot } from "../../types/domain";
import L from "leaflet";

// Fix default marker icons (Vite)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export function RiskMap({ hotspots }: { hotspots: Hotspot[] }) {
  const center = hotspots?.length
    ? ([hotspots[0].lat, hotspots[0].lng] as [number, number])
    : ([11.0168, 76.9558] as [number, number]);

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-2xl border border-white/10">
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotspots.map((h) => (
          <Marker key={h.areaId} position={[h.lat, h.lng]}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{h.name}</div>
                <div className="text-sm">
                  Risk: {h.riskScore} ({h.riskLevel})
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
