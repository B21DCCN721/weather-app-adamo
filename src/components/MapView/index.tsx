/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  position: LatLng | null;
  setPosition: (pos: LatLng) => void;
  fetchWeather: (lat: number, lng: number) => void;
}

const MapView: React.FC<MapViewProps> = ({ position, setPosition, fetchWeather }) => {
  const defaultCenter: [number, number] = [21.0285, 105.8542]; // fallback center

  // Sự kiện click để chọn vị trí khác
  const ClickHandler = () => {
    useMapEvent('click', (e) => {
      setPosition(e.latlng);
      fetchWeather(e.latlng.lat, e.latlng.lng);
    });
    return null;
  };

  return (
    <MapContainer
      center={position ?? defaultCenter}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <ClickHandler />
      {position && (
        <Marker position={position}>
          <Popup>
            <b>Vị trí:</b><br />
            Lat: {position.lat.toFixed(5)}<br />
            Lng: {position.lng.toFixed(5)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
