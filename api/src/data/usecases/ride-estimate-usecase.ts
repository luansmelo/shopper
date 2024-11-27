import { RideEstimate } from "@/domain/usecases/ride-estimate"
import { LoadDriversRepositoryProtocol } from "../protocols/db/load-driver.repository"
import { GoogleRoutesProtocol } from "@/infra/protocols/google.routes-protocol"
import { NoAvailableDriversError } from "@/domain/errors/no-available-drivers-error"

export class RideEstimateUseCase implements RideEstimate {
    constructor(
        private readonly loadDriverRepository: LoadDriversRepositoryProtocol,
        private readonly googleApiRouteService: GoogleRoutesProtocol
    ) { }

    async save(ride: RideEstimate.Params): Promise<RideEstimate.Result> {
        const route = await this.googleApiRouteService.load({
            origin: ride.origin,
            destination: ride.destination
        })

        const {
            distanceMeters, startLocation, endLocation, localizedValues
        } = route.routes[0].legs[0]

        const calculateRoute = distanceMeters / 1000

        const drivers = await this.loadDriverRepository.load()

        const availableDrivers = drivers.filter(driver => driver.min_km <= calculateRoute)
        const sortedDrivers = availableDrivers.sort((a, b) => a.rate_per_km * calculateRoute - b.rate_per_km * calculateRoute);

        if (!availableDrivers.length)
            throw new NoAvailableDriversError('No drivers available for the requested distance.')

        return {
            id: 'ride_123',
            origin: {
                origin_lat: startLocation.latLng.latitude,
                origin_lon: startLocation.latLng.longitude
            },
            destination: {
                destination_lat: endLocation.latLng.latitude,
                destination_lon: endLocation.latLng.longitude
            },
            distance: calculateRoute,
            duration: localizedValues.duration.text,
            options: sortedDrivers.map(driver => ({
                id: driver.id,
                name: driver.name,
                description: driver.description,
                car: driver.car,
                review: {
                    rating: driver.rating,
                    comment: driver.comment
                },
                value: driver.rate_per_km * calculateRoute,
            })),
            routeResponse: route
        }
    }
}