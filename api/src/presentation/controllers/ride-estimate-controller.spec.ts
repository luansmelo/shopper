import { RideEstimate } from "@/domain/usecases/ride-estimate"
import { RideEstimateController } from "./ride-estimate.controller"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest, serverError } from "../helpers/http-helper"

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
    const rideSpy = new RideUseCaseStub()
    const sut = new RideEstimateController(rideSpy)

    return {
        sut,
        rideSpy,
    }
}

describe('RideEstimate Controller', () => {
    it('Should call handle with correct values', async () => {
        const { sut } = makeSut()
        const handleSpy = jest.spyOn(sut, 'handle')
        const httpRequest = {
            body: {
                customer_id: 'customer_id',
                origin: 'any_origin',
                destination: 'any_destination'
            }
        }

        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })

    it('Should return 400 if no customer_id is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                origin: 'any_origin',
                destination: 'any_destination'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('customer_id')))
    })

    it('Should return 400 if no destination is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: 'any_customer_id',
                origin: 'any_origin',
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('destination')))
    })

    it('Should return 400 if no origin is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: 'any_customer_id',
                destination: 'any_destination'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('origin')))
    })

    it('Should call save with correct values', async () => {
        const { sut, rideSpy } = makeSut()
        const saveSpy = jest.spyOn(rideSpy, 'save')

        const httpRequest = {
            body: {
                customer_id: 'customer_id',
                origin: 'any_origin',
                destination: 'any_destination'
            },
        }

        await sut.handle(httpRequest)
        expect(saveSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('Should return 500 if RideUseCase throws an unexpected error', async () => {
        const { sut, rideSpy } = makeSut()

        jest.spyOn(rideSpy, 'save').mockImplementationOnce(() => Promise.reject(new Error()))

        const httpRequest = {
            body: {
                customer_id: 'any_customer_id',
                origin: 'any_origin',
                destination: 'any_destination'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
