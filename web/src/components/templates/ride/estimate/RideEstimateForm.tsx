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
        const result = await handleEstimateRide(data)

        reset()
        navigate('/opcoes-de-viagem', { state: { result: { ...result?.data, rideData: data } } })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Solicitar Viagem</h2>

            <div className="mb-6">
                <label htmlFor="customer_id" className="text-lg text-gray-600">ID do Cliente</label>
                <input
                    id="customer_id"
                    {...register('customer_id', { required: true, pattern: /^[0-9]+$/ })}
                    placeholder="Digite o ID do cliente"
                    className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.customer_id && <span className="text-red-500 text-sm">ID do Cliente é obrigatório e deve ser numérico.</span>}
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
                        id="origin"
                        {...register('origin', { required: true })}
                        placeholder="Digite a origem"
                        className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </Autocomplete>
                {errors.origin && <span className="text-red-500 text-sm">Origem é obrigatória.</span>}
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
                        id="destination"
                        {...register('destination', { required: true })}
                        placeholder="Digite o destino"
                        className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </Autocomplete>
                {errors.destination && <span className="text-red-500 text-sm">Destino é obrigatório.</span>}
            </div>

            <div className="flex justify-center items-center">
                <input
                    type="submit"
                    name="submit"
                    value={loading ? 'Carregando...' : 'Estimar Viagem'}
                    disabled={!isValid || loading}
                    className={`w-full py-3 mt-6 rounded-lg transition-all ${isValid && !loading ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                />
            </div>
        </form>
    )
}

export default RideEstimateForm