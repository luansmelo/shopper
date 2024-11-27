export interface RideConfirm {
    save(ride: RideConfirm.Params): Promise<RideConfirm.Result>
}

export namespace RideConfirm {
    export type Params = {
        customer_id?: number
        origin: string
        date?: Date,
        destination: string
        duration: string
        distance: number
        driver: {
            id: number
            name: string
        }
        value: number
    }

    export type Result = {
        success: boolean
    }
}

