import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Map from '../components/templates/ride/Map'
import RideOptions from '../components/templates/ride/confirm/RideOptions'
import { RideContext } from '../contexts/Ride'
import Header from '../components/header/Header'

const RideConfirmPage: React.FC = () => {
  const { state } = useLocation()
  const { rideData, origin, destination, duration, distance, options } = state?.result || {}
  const { handleConfirmRide } = useContext(RideContext)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!state) {
      navigate('/')
    }
  }, [state])

  const confirm = async () => {
    if (!selectedDriver) return

    const data = {
      customer_id: rideData.customer_id,
      origin: rideData.origin,
      destination: rideData.destination,
      distance,
      duration,
      driver: {
        id: selectedDriver.id,
        name: selectedDriver.name
      },
      value: selectedDriver.value
    }

    const response = await handleConfirmRide(data as any)

    if (response.success) {
      navigate('/historico-viagens', {
        state: { customer_id: rideData.customer_id, driver_id: selectedDriver.id }, replace: true
      })
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Header />
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Opções de Viagem</h1>

      <div className="map-container mb-8">
        <Map origin={origin} destination={destination} />
      </div>

      <RideOptions
        options={options}
        selectedDriver={selectedDriver}
        onSelectDriver={setSelectedDriver}
      />

      {selectedDriver && (
        <button
          onClick={confirm}
          className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-700"
        >
          Confirmar Viagem
        </button>
      )}
    </div>
  )
}

export default RideConfirmPage
