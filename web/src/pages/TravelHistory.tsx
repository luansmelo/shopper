import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'
import { Driver, DriverType } from '../services/driver.service'
import { DotLoader } from 'react-spinners'
import { RideContext } from '../contexts/Ride'
import { RideType } from '../services/ride.service'

const TravelHistory: React.FC = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { loading, rides, setRides, setLoading, handleLoadRides } = useContext(RideContext)

    const [driverId, setDriverId] = useState<string>('')
    const [customerId, setCustomerId] = useState<string>('')
    const [allDrivers, setAllDrivers] = useState<DriverType[]>([])
    const [filteredRides, setFilteredRides] = useState<RideType[]>([])

    useEffect(() => {
        const fetchDrivers = async () => {
            const driversResponse = await Driver.loadDrivers()
            setAllDrivers(driversResponse?.data || [])
        }
        fetchDrivers()
    }, [])

    useEffect(() => {
        if (!state?.customer_id) {
            navigate('/', { replace: true })
        } else {
            setCustomerId(state.customer_id)
        }
    }, [state, navigate])

    const loadAllRides = async () => {
        if (!customerId) return

        setLoading(true)

        const params = {
            customer_id: customerId,
            driver_id: driverId ? parseInt(driverId) : undefined,
        }

        const response = await handleLoadRides(params as any)
        setRides(response)
    }

    useEffect(() => {
        if (customerId) {
            loadAllRides()
        }
    }, [customerId, driverId])

    useEffect(() => {
        if (rides?.rides?.length > 0) {
            const filtered = driverId
                ? rides.rides.filter((ride: RideType) => ride.driver.id === parseInt(driverId))
                : rides.rides
            setFilteredRides(filtered)
        }
    }, [driverId, rides])

    const handleDriverChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDriverId(event.target.value)
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
                    disabled={loading}
                />

                <select
                    value={driverId}
                    onChange={handleDriverChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                >
                    <option value="">Todos os motoristas</option>
                    {allDrivers?.map((driver) => (
                        <option key={driver.id} value={driver.id.toString()}>
                            {driver.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <DotLoader color="#1e40af" />
                </div>
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
                                    <p><strong>Origem:</strong> {ride.origin.split(', ')[0]}</p>
                                    <p><strong>Destino:</strong> {ride.destination.split(', ')[0]}</p>
                                    <p><strong>Distância:</strong> {ride.distance} km</p>
                                    <p><strong>Duração:</strong> {ride.duration}</p>
                                    <p><strong>Valor:</strong> R${ride.value.toFixed(2).replace('.', ',')}</p>
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
