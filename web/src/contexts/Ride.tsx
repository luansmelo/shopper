import React, { createContext, ReactNode } from 'react';
import { Ride, RideConfirmParams, RideConfirmResult, RideEstimateParams } from '../services/ride.service';

interface RideState {
    handleEstimateRide: (body: RideEstimateParams) => Promise<any>
    handleConfirmRide: (body: RideConfirmParams) => Promise<RideConfirmResult>
}

export const RideContext = createContext<RideState>({} as RideState);

interface RideProviderProps {
    children: ReactNode;
}

export const RideProvider: React.FC<RideProviderProps> = ({ children }) => {

    const handleEstimateRide = async (body: RideEstimateParams) => {
        try {
            const response = await Ride.create(body)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleConfirmRide = async (body: RideConfirmParams) => {
        try {
            const response = await Ride.confirm(body)
            return response && response?.data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <RideContext.Provider
            value={{ handleConfirmRide, handleEstimateRide }}>
            {children}
        </RideContext.Provider>
    )
}
