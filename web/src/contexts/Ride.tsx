import React, { createContext, ReactNode, useState } from 'react'
import { Ride, RideConfirmParams, RideConfirmResult, RideEstimateParams, RideResult, RidesParams } from '../services/ride.service'
import { toast } from 'react-toastify'

interface RideState {
    ride: RideResult,
    rides: RideResult,
    handleEstimateRide: (body: RideEstimateParams) => Promise<any>
    handleConfirmRide: (body: RideConfirmParams) => Promise<RideConfirmResult>
    handleLoadRides: (params: RidesParams) => Promise<RideResult>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setRide: React.Dispatch<React.SetStateAction<RideResult>>
    setRides: React.Dispatch<React.SetStateAction<RideResult>>
}

export const RideContext = createContext<RideState>({} as RideState)

interface RideProviderProps {
    children: ReactNode
}

export const RideProvider: React.FC<RideProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [ride, setRide] = useState<RideResult>({} as RideResult)
    const [rides, setRides] = useState<RideResult>({} as RideResult)

    const handleEstimateRide = async (body: RideEstimateParams) => {
        setLoading(true)
        try {
            const response = await Ride.create(body)
            return response
        } catch (error: any) {
            if (error?.response?.data?.error_code === 'NO_ROUTES_FOUND') {
                toast.error("Nenhuma rota encontrada para a origem e destino informados.", {
                    position: 'top-center',
                    autoClose: 5000,
                })
            } else if (error?.response?.data?.error_code === 'ORIGIN_EQUALS_DESTINATION') {
                toast.error("A origem e o destino não podem ser os mesmos.", {
                    position: 'top-center',
                    autoClose: 5000,
                })
            } else {
                toast.error("Ocorreu um erro ao estimar a viagem. Tente novamente.", {
                    position: 'top-center',
                    autoClose: 5000,
                })
            }
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmRide = async (body: RideConfirmParams) => {
        try {
            const response = await Ride.confirm(body)
            return response && response?.data
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
    }

    const handleLoadRides = async (params: RidesParams) => {
        try {
            const response = await Ride.loadRides(params)
            return response?.data
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
    }

    return (
        <RideContext.Provider
            value={{ ride, rides, loading, setRide, setRides, setLoading, handleConfirmRide, handleLoadRides, handleEstimateRide }}>
            {children}
        </RideContext.Provider>
    )
}
