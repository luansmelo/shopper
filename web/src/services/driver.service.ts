import api from "../config/api"

export type DriverType = {
    id: number
    name: string
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