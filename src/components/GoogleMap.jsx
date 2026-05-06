import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { T } from "../constants/theme";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function GoogleMapComponent({ markers = [], routePath = [], onMapClick }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const defaultCenter = {
    lat: 47.9,
    lng: 106.88,
  };

  if (!apiKey) {
    return (
      <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", background: T.surfaceContainer, color: T.onSurfaceVariant, padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 16, maxWidth: 420, lineHeight: 1.7 }}>
          Google Maps API key is missing. Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to your <code>.env</code> file and restart the dev server.
        </p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={7}
        onClick={onMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: T.primary,
              strokeOpacity: 0.85,
              strokeWeight: 4,
              geodesic: true,
            }}
          />
        )}

        {markers.map((marker) => (
          <Marker
            key={marker.id || marker.name}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
