import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Map from '../components/templates/ride/Map'
import RideOptions from '../components/templates/ride/confirm/RideOptions'
import { RideContext } from '../contexts/Ride'
import Header from '../components/header/Header'
import { toast } from 'react-toastify'

const RideConfirmPage: React.FC = () => {
  const { state } = useLocation()
  const { rideData, origin, destination, duration, distance, options } = state?.result || {}
  const { loading, setLoading, handleConfirmRide } = useContext(RideContext)
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

    setLoading(true)

    if (response.success) {
      toast.success('Viagem confirmada com sucesso!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      setTimeout(() => {
        navigate('/historico-viagens', {
          state: { customer_id: rideData.customer_id, driver_id: selectedDriver.id },
          replace: true
        })
      }, 1800)
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
          disabled={loading}
          className={`w-full py-2 rounded mt-4 flex justify-center items-center 
            ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} 
            text-white`}
        >
          {loading ? 'Carregando...' : 'Confirmar Viagem'}
        </button>
      )}
    </div>
  )
}

export default RideConfirmPage
