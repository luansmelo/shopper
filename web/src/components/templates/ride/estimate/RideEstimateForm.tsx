import React, { useState, useRef, useContext } from 'react'
import { LoadScript, Libraries, Autocomplete } from '@react-google-maps/api'
import Input from '../../../Input'
import { RideContext } from '../../../../contexts/Ride'
import { RideEstimateParams } from '../../../../services/ride.service'
import { useNavigate } from 'react-router-dom'

const libraries: Libraries = ['places']

const RideEstimateForm: React.FC = () => {
    const { loading, handleEstimateRide } = useContext(RideContext)
    const [customerId, setCustomerId] = useState<number>(0)
    const [origin, setOrigin] = useState<string>('')
    const [destination, setDestination] = useState<string>('')
    const originRef = useRef<HTMLInputElement>(null)
    const destinationRef = useRef<HTMLInputElement>(null)
    const originAutocomplete = useRef<google.maps.places.Autocomplete | null>(null)
    const destinationAutocomplete = useRef<google.maps.places.Autocomplete | null>(null)

    const navigate = useNavigate()

    const handlePlaceChange = (field: 'origin' | 'destination', autocomplete: google.maps.places.Autocomplete) => {
        const place = autocomplete?.getPlace()
        if (place?.geometry?.location) {
            const formattedAddress = place.formatted_address || ''
            if (field === 'origin') {
                setOrigin(formattedAddress)
                if (originRef.current) {
                    originRef.current.value = formattedAddress
                }
            } else {
                setDestination(formattedAddress)
                if (destinationRef.current) {
                    destinationRef.current.value = formattedAddress
                }
            }
        }
    }

    const handleCustomerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '')
        setCustomerId(Number(value))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const rideData: RideEstimateParams = {
            customer_id: customerId,
            origin,
            destination,
        }
        const result = await handleEstimateRide(rideData)
        navigate('/opcoes-de-viagem', { state: { result: { ...result?.data, rideData } } })
    }

    const isFormValid = customerId > 0 && origin !== '' && destination !== ''

    return (
        <LoadScript
            googleMapsApiKey={process.env.GOOGLE_API_KEY || ''}
            libraries={libraries}
        >
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Solicitar Viagem</h2>

                <Input.Root>
                    <Input.Label htmlFor="customer_id" className="text-lg text-gray-600">ID do Cliente</Input.Label>
                    <Input.Group>
                        <Input.Input
                            id="customer_id"
                            name="customer_id"
                            value={customerId}
                            onChange={handleCustomerIdChange}
                            onInput={(e) => e.preventDefault()}
                            placeholder="Digite o ID do cliente"
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            min={1}
                        />
                    </Input.Group>
                </Input.Root>

                <Input.Root className="mt-6">
                    <Input.Label htmlFor="origin" className="text-lg text-gray-600">Origem</Input.Label>
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
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                onChange={(e) => setOrigin(e.target.value)}
                            />
                        </Autocomplete>
                    </Input.Group>
                </Input.Root>

                <Input.Root className="mt-6">
                    <Input.Label htmlFor="destination" className="text-lg text-gray-600">Destino</Input.Label>
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
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </Autocomplete>
                    </Input.Group>
                </Input.Root>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                            className={`w-full py-3 mt-6 rounded-lg transition-all ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                            style={{
                                pointerEvents: isFormValid ? 'auto' : 'none',
                            }}
                        >
                            Estimar Viagem
                        </button>
                    </div>) : 'Estimar viagem'
                }
            </div>
        </LoadScript>
    )
}

export default RideEstimateForm
