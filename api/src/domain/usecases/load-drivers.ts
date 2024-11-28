
export interface LoadDrivers {
    load(): Promise<LoadDrivers.Result>
}

export namespace LoadDrivers {

    export type Result = {
        id: number
        name: string
        description: string
        car: string
        rating: string
        comment: string
        rate_per_km: number
        min_km: number
    }[]
}