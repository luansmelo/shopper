export namespace RideConfirmRepositoryProtocol {
    export type Params = {
        customer_id: number
        origin: string
        destination: string
        distance: number
        duration: string
        driver_id: number
    }
    export type Result = {
        id: number
        date?: Date
        origin: string
        destination: string
        distance: number
        duration: string
    }
}

export interface RideConfirmRepositoryProtocol {
    save(data: RideConfirmRepositoryProtocol.Params): Promise<RideConfirmRepositoryProtocol.Result>
}