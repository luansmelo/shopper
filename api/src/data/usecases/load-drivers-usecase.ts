import { LoadDrivers } from "@/domain/usecases/load-drivers"
import { LoadDriversRepositoryProtocol } from "../protocols/db/load-driver.repository"

export class LoadDriverslUseCase implements LoadDrivers {
    constructor(private readonly repository: LoadDriversRepositoryProtocol) { }

    async load(): Promise<LoadDriversRepositoryProtocol.Result[]> {
        return await this.repository.load()
    }
}