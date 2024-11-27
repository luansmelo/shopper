export interface LoadDriversRepositoryProtocol {
    load(): Promise<LoadDriversRepositoryProtocol.Result[]>
}

export namespace LoadDriversRepositoryProtocol {
    export type Result = {
        id: string
        name: string
        description: string
        car: string
        rating: string
        comment: string
        rate_per_km: number
        min_km: number
    }
}