import React, { useState, useRef, useContext } from 'react'
import { LoadScript, Libraries, Autocomplete } from '@react-google-maps/api'
import Input from '../../../Input'
import { RideContext } from '../../../../contexts/Ride'
import { RideEstimateParams } from '../../../../services/ride.service'
import { useNavigate } from 'react-router-dom'

const libraries: Libraries = ['places']

const RideEstimateForm: React.FC = () => {
    const { handleEstimateRide } = useContext(RideContext)
    const [customerId, setCustomerId] = useState<number>(0)
    const originRef = useRef<HTMLInputElement>(null)
    const destinationRef = useRef<HTMLInputElement>(null)
    const originAutocomplete = useRef<google.maps.places.Autocomplete | null>(null)
    const destinationAutocomplete = useRef<google.maps.places.Autocomplete | null>(null)

    const navigate = useNavigate()

    const handlePlaceChange = (field: 'origin' | 'destination', autocomplete: google.maps.places.Autocomplete) => {
        const place = autocomplete.getPlace()
        if (place.geometry?.location) {
            const formattedAddress = place.formatted_address || ''
            if (field === 'origin') {
                if (originRef.current) {
                    originRef.current.value = formattedAddress
                }
            } else {
                if (destinationRef.current) {
                    destinationRef.current.value = formattedAddress
                }
            }
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const rideData: RideEstimateParams = {
            customer_id: customerId,
            origin: originRef.current?.value || '',
            destination: destinationRef.current?.value || '',
        }
        const result = await handleEstimateRide(rideData)
        navigate('/opcoes-de-viagem', { state: { result: { ...result?.data, rideData } } })
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.GOOGLE_API_KEY || ''}
            libraries={libraries}
        >
            <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Solicitar Viagem</h2>
                <Input.Root>
                    <Input.Label htmlFor="customer_id">ID do Cliente</Input.Label>
                    <Input.Group>
                        <Input.Input
                            id="customer_id"
                            name="customer_id"
                            value={customerId}
                            onChange={(e) => setCustomerId(Number(e.target.value))}
                            placeholder="Digite o ID do cliente"
                        />
                    </Input.Group>
                </Input.Root>

                <Input.Root>
                    <Input.Label htmlFor="origin">Origem</Input.Label>
                    <Input.Group>
                        <Autocomplete
                            onLoad={(autocomplete) => {
                                originAutocomplete.current = autocomplete
                            }}
                            onPlaceChanged={() => {
                                if (originAutocomplete.current) {
                                    handlePlaceChange('origin', originAutocomplete.current)
                                }
                            }}
                        >
                            <Input.Input
                                id="origin"
                                name="origin"
                                ref={originRef}
                                placeholder="Digite a origem"
                            />
                        </Autocomplete>
                    </Input.Group>
                </Input.Root>

                <Input.Root>
                    <Input.Label htmlFor="destination">Destino</Input.Label>
                    <Input.Group>
                        <Autocomplete
                            onLoad={(autocomplete) => {
                                destinationAutocomplete.current = autocomplete
                            }}
                            onPlaceChanged={() => {
                                if (destinationAutocomplete.current) {
                                    handlePlaceChange('destination', destinationAutocomplete.current)
                                }
                            }}
                        >
                            <Input.Input
                                id="destination"
                                name="destination"
                                ref={destinationRef}
                                placeholder="Digite o destino"
                            />
                        </Autocomplete>
                    </Input.Group>
                </Input.Root>

                <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-700">
                    Estimar Viagem
                </button>
            </div>
        </LoadScript>
    )
}

export default RideEstimateForm
