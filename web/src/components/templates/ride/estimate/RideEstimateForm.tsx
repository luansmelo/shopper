import React, { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Autocomplete } from '@react-google-maps/api'
import { RideContext } from '../../../../contexts/Ride'
import { RideEstimateParams } from '../../../../services/ride.service'
import { useNavigate } from 'react-router-dom'

const RideEstimateForm: React.FC = () => {
    const { loading, handleEstimateRide } = useContext(RideContext)
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm<RideEstimateParams>()
    const [originAutocomplete, setOriginAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
    const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

    const onSubmit: SubmitHandler<RideEstimateParams> = async (data) => {
        try {
            const result = await handleEstimateRide(data)

            reset()
            navigate('/opcoes-de-viagem', { state: { result: { ...result?.data, rideData: data } } })
        } catch (error) {
            console.log('Erro ao estimar viagem:', error)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-primary mb-6">Solicitar Viagem</h2>

            <div className="mb-6">
                <label htmlFor="customer_id" className="text-lg text-gray-600">ID do Cliente</label>
                <input
                    id="customer_id"
                    type="number"
                    {...register('customer_id', {
                        required: 'ID do Cliente é obrigatório.',
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Somente números são permitidos.'
                        }
                    })}
                    placeholder="Digite o ID do cliente"
                    className={`w-full p-3 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 transition-all ${errors.customer_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.customer_id && <span className="text-red-500 text-sm">{errors.customer_id.message}</span>}
            </div>

            <div className="mb-6">
                <label htmlFor="origin" className="text-lg text-gray-600">Origem</label>
                <Autocomplete
                    onLoad={(autocompleteInstance) => {
                        setOriginAutocomplete(autocompleteInstance)
                    }}
                    onPlaceChanged={() => {
                        if (originAutocomplete) {
                            const place = originAutocomplete.getPlace()
                            if (place?.geometry?.location) {
                                setValue('origin', place.formatted_address || '')
                            }
                        }
                    }}
                >
                    <input
                        onKeyDown={handleKeyDown}
                        id="origin"
                        {...register('origin', { required: 'Origem é obrigatória.' })}
                        placeholder="Digite a origem"
                        className={`w-full p-3 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 transition-all ${errors.origin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                </Autocomplete>
                {errors.origin && <span className="text-red-500 text-sm">{errors.origin.message}</span>}
            </div>

            <div className="mb-6">
                <label htmlFor="destination" className="text-lg text-gray-600">Destino</label>
                <Autocomplete
                    onLoad={(autocompleteInstance) => {
                        setDestinationAutocomplete(autocompleteInstance)
                    }}
                    onPlaceChanged={() => {
                        if (destinationAutocomplete) {
                            const place = destinationAutocomplete.getPlace()
                            if (place?.geometry?.location) {
                                setValue('destination', place.formatted_address || '')
                            }
                        }
                    }}
                >
                    <input
                        onKeyDown={handleKeyDown}
                        id="destination"
                        {...register('destination', { required: 'Destino é obrigatório.' })}
                        placeholder="Digite o destino"
                        className={`w-full p-3 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 transition-all ${errors.destination ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                </Autocomplete>
                {errors.destination && <span className="text-red-500 text-sm">{errors.destination.message}</span>}
            </div>

            <div className="flex justify-center items-center">
                <button
                    type="submit"
                    disabled={!isValid || loading}
                    className={`w-full py-3 mt-6 rounded-lg transition-all ${isValid && !loading ? 'bg-primary text-white hover:bg-neutral-500' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                >
                    {loading ? 'Carregando...' : 'Estimar Viagem'}
                </button>
            </div>
        </form>
    )
}

export default RideEstimateForm
