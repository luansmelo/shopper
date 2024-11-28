import React, { useState, useEffect } from 'react'
import api from "../config/api"

const TravelHistory: React.FC = () => {
    const [userRides, setUserRides] = useState([])

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await api.get("/ride/1?driver_id=2")
                setUserRides(response.data.rides.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()))
            } catch (error) {
                console.error('Erro ao carregar histórico:', error)
            }
        }

        fetchRides()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl text-center font-semibold text-blue-600 mb-8">Histórico de Viagens</h1>

            <div className="mb-6">
                <ul>
                    {userRides.map((ride: any) => (
                        <li key={ride.id} className="bg-white shadow-md p-4 mb-4 rounded-lg">
                            <p><strong>Origem:</strong> {ride.origin}</p>
                            <p><strong>Destino:</strong> {ride.destination}</p>
                            <p><strong>Distância:</strong> {ride.distance} km</p>
                            <p><strong>Duração:</strong> {ride.duration}</p>
                            <p><strong>Motorista:</strong> {ride.driver.name}</p>
                            <p><strong>Valor:</strong> R${ride.value}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TravelHistory
