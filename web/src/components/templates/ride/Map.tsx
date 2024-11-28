import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

interface MapProps {
  origin: { latitude: number, longitude: number }
  destination: { latitude: number, longitude: number }
}

const Map: React.FC<MapProps> = ({ origin, destination }) => {
  const mapRef = useRef<google.maps.Map | null>(null)
  const directionsService = useRef<google.maps.DirectionsService | null>(null)
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [markerLibLoaded, setMarkerLibLoaded] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_API_KEY || '',
  })

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map
    if (directionsRenderer.current) {
      directionsRenderer.current.setMap(map)
    }
  }, [])

  const onUnmount = useCallback(function callback() {
    mapRef.current = null
  }, [])

  useEffect(() => {
    if (isLoaded) {
      directionsService.current = new window.google.maps.DirectionsService()
      directionsRenderer.current = new window.google.maps.DirectionsRenderer()
      setLoaded(true)
    }
  }, [isLoaded])

  useEffect(() => {
    if (loaded && mapRef.current && directionsService.current && directionsRenderer.current && origin && destination) {
      const originLatLng = new window.google.maps.LatLng(origin.latitude, origin.longitude)
      const destinationLatLng = new window.google.maps.LatLng(destination.latitude, destination.longitude)

      const request = {
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: window.google.maps.TravelMode.DRIVING,
      }

      directionsService.current.route(request, (result: any, status: any) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.current?.setDirections(result)

          if (mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds()
            bounds.extend(originLatLng)
            bounds.extend(destinationLatLng)
            mapRef.current.fitBounds(bounds)
          }
        } else {
          console.error("Directions request failed due to " + status)
        }
      })

      if (markerLibLoaded) {
        new window.google.maps.Marker({
          position: originLatLng,
          map: mapRef.current,
          title: "Ponto A",
        })

        new window.google.maps.Marker({
          position: destinationLatLng,
          map: mapRef.current,
          title: "Ponto B",
        })
      }
    }
  }, [origin, destination, loaded, markerLibLoaded])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: origin.latitude, lng: origin.longitude }}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  )
}

export default Map
