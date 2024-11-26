export type DriverModel = {
    id: string
    name: string
    description: string
    car: string
    review: {
        rating: number
        comment: string
    }
    value: number
}