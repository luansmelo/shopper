import React, { createContext, ReactNode, useState } from 'react'
import { Ride, RideConfirmParams, RideConfirmResult, RideEstimateParams, RideResult, RidesParams } from '../services/ride.service'

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
        } catch (error) {
            console.log(error)
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
            setLoading(false)
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
                setLoading(false);
            }, 1500);
        }
    }

    return (
        <RideContext.Provider
            value={{ ride, rides, loading, setRide, setRides, setLoading, handleConfirmRide, handleLoadRides, handleEstimateRide }}>
            {children}
        </RideContext.Provider>
    )
}
