import { RideEstimateUseCase } from "@/data/usecases/ride-estimate-usecase";
import { DriverRepository } from "@/infra/db/repositories/driver.repository";
import { RideEstimateController } from "@/presentation/controllers/ride-estimate.controller";
import { makeGoogleRoutesGateway } from "./infra/gateways/google-routes";

export const makeRideEstimateController = (): RideEstimateController => {
    const driverRepository = new DriverRepository()
    const useCase = new RideEstimateUseCase(driverRepository, makeGoogleRoutesGateway())
    return new RideEstimateController(useCase)
}