import { DriverModel } from "./driver"

export type RideModel = {
    id?: number
    customer_id?: number
    origin: {
        latitude: number
        longitude: number
    }
    destination: {
        latitude: number
        longitude: number
    }
    distance: number
    duration: string
    options: DriverModel[]
    routeResponse?: object
}