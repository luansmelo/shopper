import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface MapProps {
  origin: { latitude: number, longitude: number };
  destination: { latitude: number, longitude: number };
}

const Map: React.FC<MapProps> = ({ origin, destination }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (mapRef.current && origin && destination) {
      // Initialize DirectionsService and DirectionsRenderer only once
      if (!directionsService.current || !directionsRenderer.current) {
        directionsService.current = new window.google.maps.DirectionsService();
        directionsRenderer.current = new window.google.maps.DirectionsRenderer();
        directionsRenderer.current.setMap(mapRef.current);
      }

      const originLatLng = new window.google.maps.LatLng(origin.latitude, origin.longitude);
      const destinationLatLng = new window.google.maps.LatLng(destination.latitude, destination.longitude);

      const request = {
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.current.route(request, (result: any, status: any) => {
        if (status === window.google.maps.DirectionsStatus.OK && directionsRenderer.current) {
          directionsRenderer.current.setDirections(result);

          if (mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(originLatLng);
            bounds.extend(destinationLatLng);
            mapRef.current.fitBounds(bounds);
          }
        }
      });

      // Add standard markers for origin and destination
      new google.maps.Marker({
        position: originLatLng,
        map: mapRef.current,
        title: "Ponto A",
      });

      new google.maps.Marker({
        position: destinationLatLng,
        map: mapRef.current,
        title: "Ponto B",
      });
    }
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: origin.latitude, lng: origin.longitude }}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      />
    </LoadScript>
  );
};

export default Map;
