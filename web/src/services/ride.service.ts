import api from "../config/api"

export type RideEstimateResponse = {

}

export type RideEstimateParams = {
    customer_id: number
    origin: string
    destination: string
}

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

export type RideConfirmResult = {
    success: boolean
}

export type RidesParams = {
    customer_id: number
    driver_id?: number
}

const create = async (data: RideEstimateParams) => {
    try {
        const response = await api.post('/ride/estimate', data)
        return response
    } catch (error) {
        console.log(error)
    }
}

const confirm = async (data: RideConfirmParams) => {
    try {
        const response = await api.patch('/ride/confirm', data)
        return response
    } catch (error) {
        console.log(error)
    }
}

const loadRides = async (params: RidesParams) => {
    try {
        const url = params.driver_id
            ? `/ride/${params.customer_id}?driver_id=${params.driver_id}`
            : `/ride/${params.customer_id}`;

        const response = await api.get(url)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const Ride = {
    create,
    confirm,
    loadRides
}