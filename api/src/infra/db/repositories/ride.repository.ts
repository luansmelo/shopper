import { RideConfirmRepositoryProtocol } from "@/data/protocols/db/ride-confirm.repository"
import { DriverModel, RideModel } from "../models"
import { LoadRidesRepositoryProtocol } from "@/data/protocols/db/load-rides.repository"

export class RideRepository implements RideConfirmRepositoryProtocol, LoadRidesRepositoryProtocol {
    async save(params: RideConfirmRepositoryProtocol.Params): Promise<RideConfirmRepositoryProtocol.Result> {
        const ride = await RideModel.create(params)
        return ride.get({ plain: true })
    }

    async load(params: LoadRidesRepositoryProtocol.Params): Promise<LoadRidesRepositoryProtocol.Result> {
        const { customer_id, driver_id } = params
        let whereCondictions: Record<string, number> = {
            customer_id,
        }

        if (driver_id) {
            whereCondictions.driver_id = driver_id
        }

        const rides = await RideModel.findAll({
            where: whereCondictions,
            include: [{
                model: DriverModel,
                required: true,
            }],
            order: [['date', 'DESC']],
        })

        return {
            customer_id,
            rides: rides.map(ride => ({
                id: ride.id,
                date: ride.date,
                origin: ride.origin,
                destination: ride.destination,
                distance: Number(ride.distance),
                duration: ride.duration,
                driver: {
                    id: ride.driver.id,
                    name: ride.driver.name,
                },
                value: Number(ride.value),
            }))
        }
    }
}