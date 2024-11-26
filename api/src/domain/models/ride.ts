import { DriverModel } from "./driver"

export type RideModel = {
    id: string
    origin: {
        origin_lat: number
        origin_lon: number
    }
    destination: {
        destination_lat: number
        destination_lon: number
    }
    distance: number
    duration: number
    options: DriverModel[]
    routeResponse: object
}