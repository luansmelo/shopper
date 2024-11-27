import { LoadRideslUseCase } from "@/data/usecases/load-rides-usecase";
import { RideRepository } from "@/infra/db/repositories/ride.repository";
import { LoadRidesController } from "@/presentation/controllers/load-ride.controller";

export const makeLoadRidesController = (): LoadRidesController => {
    const repository = new RideRepository()
    const useCase = new LoadRideslUseCase(repository)
    return new LoadRidesController(useCase)
}