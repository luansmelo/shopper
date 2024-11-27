import { RideConfirmUseCase } from "@/data/usecases/ride-confirm-usecase"
import { RideRepository } from "@/infra/db/repositories/ride.repository"
import { RideConfirmController } from "@/presentation/controllers/ride-confirm.controller"

export const makeRideConfirmController = (): RideConfirmController => {
    const repository = new RideRepository()
    const useCase = new RideConfirmUseCase(repository)
    return new RideConfirmController(useCase)
}