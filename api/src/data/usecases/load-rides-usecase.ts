import { LoadRides } from "@/domain/usecases/load-rides"
import { LoadRidesRepositoryProtocol } from "../protocols/db/load-rides.repository"

export class LoadRideslUseCase implements LoadRides {
    constructor(private readonly repository: LoadRidesRepositoryProtocol) { }

    async load(params: LoadRidesRepositoryProtocol.Params): Promise<LoadRidesRepositoryProtocol.Result> {
        return await this.repository.load(params)
    }
}