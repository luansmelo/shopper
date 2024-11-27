import { LoadRides } from "@/domain/usecases/load-rides"

export interface LoadRidesRepositoryProtocol {
    load(params: LoadRidesRepositoryProtocol.Params): Promise<LoadRidesRepositoryProtocol.Result>
}

export namespace LoadRidesRepositoryProtocol {
    export type Params = LoadRides.Params
    export type Result = LoadRides.Result
}