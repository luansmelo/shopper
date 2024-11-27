import { RideConfirm } from "@/domain/usecases/ride-confirm"
import { RideConfirmRepositoryProtocol } from "../protocols/db/ride-confirm.repository"

export class RideConfirmUseCase implements RideConfirm {
    constructor(private readonly repository: RideConfirmRepositoryProtocol) { }

    async save(ride: RideConfirm.Params): Promise<RideConfirm.Result> {
        const rideConfirm = await this.repository.save({
            ...ride,
            customer_id: ride.customer_id,
            driver_id: ride.driver.id,
        })

        return {
            success: !!rideConfirm
        }
    }
}