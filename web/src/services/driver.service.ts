import api from "../config/api"

export type RideConfirmParams = {
    customer_id: number
    origin: string
    destination: string
    duration: string
    distance: number
    driver: {
        id: number
        name: string
    }
    value: number
}

const loadDrivers = async () => {
    try {
        const response = await api.get('/driver')
        return response
    } catch (error) {
        console.log(error)
    }
}

export const Driver = {
    loadDrivers
}