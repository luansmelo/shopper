export type DriverModel = {
    id: string
    name: string
    description: string
    car: string
    review: {
        rating: string
        comment: string
    }
    value: number
}