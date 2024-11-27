export type DriverModel = {
    id: string
    name: string
    description: string
    vehicle: string
    review: {
        rating: string
        comment: string
    }
    value: number
}