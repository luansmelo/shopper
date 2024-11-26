import { RideModel } from "../models/ride"

export interface RideEstimate {
    save(ride: RideEstimate.Params): Promise<RideEstimate.Result>
}

export namespace RideEstimate {
    export type Params = {
        customer_id: string,
        origin: string,
        destination: string
    }

    export type Result = RideModel
}