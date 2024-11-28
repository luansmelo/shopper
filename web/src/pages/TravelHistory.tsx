import React, { useState, useEffect } from 'react'
import { Ride } from '../services/ride.service'
import { useLocation } from 'react-router-dom'
import Header from '../components/header/Header'
import { Driver } from '../services/driver.service'

const TravelHistory: React.FC = () => {
    const { state } = useLocation()
    const [userRides, setUserRides] = useState([])
    const [driverId, setDriverId] = useState<string>('')
    const [allDrivers, setAllDrivers] = useState<any[]>([])
    const [filteredRides, setFilteredRides] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [customerId, setCustomerId] = useState<string>('')

    useEffect(() => {
        const fetchDrivers = async () => {
            const driversResponse = await Driver.loadDrivers()
            setAllDrivers(driversResponse && driversResponse.data)
        }

        fetchDrivers()
    }, [])

    useEffect(() => {
        if (!state) {
            window.location.href = '/'
        }
    }, [state])

    const handleLoadRides = async () => {
        if (!customerId) return

        setLoading(true)

        const params = {
            customer_id: customerId,
            driver_id: driverId ? parseInt(driverId) : undefined,
        }

        const response = await Ride.loadRides(params as any)
        setUserRides(response?.data?.rides || [])
        setLoading(false)
    }

    useEffect(() => {
        if (userRides.length > 0) {
            const filtered = driverId
                ? userRides.filter((ride: any) => ride.driver.id === parseInt(driverId))
                : userRides
            setFilteredRides(filtered)
        }
    }, [driverId, userRides])

    const handleApplyFilter = () => {
        handleLoadRides()
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Header />
            <h1 className="text-3xl text-center font-semibold text-blue-600 mb-8">Histórico de Viagens</h1>

            <div className="mb-6 flex justify-center gap-4">
                <input
                    type="text"
                    placeholder="ID do Cliente"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />

                <select
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="">Todos os motoristas</option>
                    {allDrivers?.map((driver) => (
                        <option key={driver.id} value={driver.id.toString()}>
                            {driver.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleApplyFilter}
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Aplicar Filtro
                </button>
            </div>

            {loading ? (
                <p className="text-center text-blue-600">Carregando...</p>
            ) : (
                <div className="mb-6">
                    {filteredRides.length === 0 ? (
                        <p className="text-center text-gray-500">Nenhum histórico de viagens encontrado.</p>
                    ) : (
                        <ul>
                            {filteredRides.map((ride) => (
                                <li key={ride.id} className="bg-white shadow-md p-4 mb-4 rounded-lg">
                                    <p><strong>Data e Hora:</strong> {new Date(ride.date).toLocaleString()}</p>
                                    <p><strong>Motorista:</strong> {ride.driver.name}</p>
                                    <p><strong>Origem:</strong> {ride.origin}</p>
                                    <p><strong>Destino:</strong> {ride.destination}</p>
                                    <p><strong>Distância:</strong> {ride.distance} km</p>
                                    <p><strong>Duração:</strong> {ride.duration}</p>
                                    <p><strong>Valor:</strong> R${ride.value}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

export default TravelHistory
