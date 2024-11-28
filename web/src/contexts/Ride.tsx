import React, { createContext, ReactNode, useState } from 'react'
import { Ride, RideConfirmParams, RideConfirmResult, RideEstimateParams } from '../services/ride.service'

interface RideState {
    handleEstimateRide: (body: RideEstimateParams) => Promise<any>
    handleConfirmRide: (body: RideConfirmParams) => Promise<RideConfirmResult>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const RideContext = createContext<RideState>({} as RideState)

interface RideProviderProps {
    children: ReactNode
}

export const RideProvider: React.FC<RideProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)

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

    return (
        <RideContext.Provider
            value={{ loading, setLoading, handleConfirmRide, handleEstimateRide }}>
            {children}
        </RideContext.Provider>
    )
}
