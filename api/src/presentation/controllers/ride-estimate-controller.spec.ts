import { RideEstimate } from "@/domain/usecases/ride-estimate"
import { RideEstimateController } from "./ride-estimate.controller"

class RideUseCaseStub implements RideEstimate {
    async save(data: RideEstimate.Params): Promise<RideEstimate.Result> {
        return new Promise(resolve => resolve({
            id: 'ride_123',
            origin: { origin_lat: 40.712776, origin_lon: -74.005974 },
            destination: { destination_lat: 40.730610, destination_lon: -73.935242 },
            distance: 1000,
            duration: 15,
            options: [
                {
                    id: 'driver_1',
                    name: 'John Doe',
                    description: 'Motorista experiente',
                    car: 'Toyota Corolla 2020',
                    review: { rating: 2.5, comment: 'Muito bom!' },
                    value: 2.50
                },
                {
                    id: 'driver_2',
                    name: 'John Jash',
                    description: 'Motorista muito bom de corrida',
                    car: 'Camaro Amarelo 2019',
                    review: { rating: 4.0, comment: 'Muito querido pelos passageiros!' },
                    value: 5.00
                }
            ],
            routeResponse: {
                legs: [
                    {
                        startLocation: {
                            latLng: { latitude: -12.6718773, longitude: -39.1039333 },
                        },
                        endLocation: {
                            latLng: { latitude: -12.9777334, longitude: -38.5016471 },
                        },
                        distanceMeters: 152480,
                        localizedValues: {
                            duration: { text: "2 horas 8 minutos" },
                        },
                    },
                ],
            },
        }))
    }
}

const makeSut = () => {
    const rideUseCase = new RideUseCaseStub()
    const sut = new RideEstimateController(rideUseCase)

    return {
        sut,
        rideUseCase,
    }
}

describe('RideEstimate Controller', () => {
    it('Should return 200 with correct ride response', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: 'customer_id',
                origin: 'any_origin',
                destination: 'any_destination'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toHaveProperty('id')
        expect(httpResponse.body).toHaveProperty('origin')
        expect(httpResponse.body).toHaveProperty('destination')
    })
})