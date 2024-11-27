import { RideConfirm } from "./ride-confirm";

export interface LoadRides {
    load(params: LoadRides.Params): Promise<LoadRides.Result>
}

export namespace LoadRides {
    export type Params = {
        customer_id: number
        driver_id: number
    }

    export type Result = {
        customer_id: number
        rides: RideConfirm.Params[]
    }
}