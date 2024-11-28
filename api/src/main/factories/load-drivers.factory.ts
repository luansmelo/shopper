import { LoadDriverslUseCase } from "@/data/usecases/load-drivers-usecase";
import { DriverRepository } from "@/infra/db/repositories/driver.repository";
import { LoadDriversController } from "@/presentation/controllers/load-drivers.controller";

export const makeLoadDriversController = (): LoadDriversController => {
    const repository = new DriverRepository()
    const useCase = new LoadDriverslUseCase(repository)
    return new LoadDriversController(useCase)
}