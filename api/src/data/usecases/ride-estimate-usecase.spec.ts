import { RideEstimate } from "@/domain/usecases/ride-estimate"
import { LoadDriversRepositoryProtocol } from "../protocols/db/load-driver.repository"
import { RideEstimateUseCase } from "./ride-estimate-usecase"
import { GoogleRoutesProtocol } from "@/infra/protocols/google.routes-protocol"
import { NoAvailableDriversError } from "@/domain/errors/no-available-drivers-error"

class LoadDriverRepositorySpy implements LoadDriversRepositoryProtocol {
    async load(): Promise<LoadDriversRepositoryProtocol.Result[]> {
        return new Promise(resolve => resolve([
            {
                id: 'driver_1',
                name: 'Homer simpson',
                description: `Olá! Sou o Homer, seu motorista camarada!
                              Relaxe e aproveite o passeio, com direito a rosquinhas e
                              boas risadas (e alvez alguns desvios).`,
                car: 'Plymouth Valiant 1973 rosa e enferrujado',
                rating: '2/5',
                comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
                rate_per_km: 2.50,
                min_km: 1
            },
            {
                id: 'driver_2',
                name: 'Dominic Toretto',
                description: `Ei, aqui é o Dom. Pode entrar,
                              vou te levar com segurança e rapidez ao seu
                              destino. Só não mexa no rádio, a playlist é sagrada.`,
                car: 'Dodge Charger R/T 1970 modificado',
                rating: '4/5',
                comment: `Que viagem incrível! 
                                             O carro é um show à parte e o motorista, 
                                             apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!'
                                            `,
                rate_per_km: 5.00,
                min_km: 5
            },
            {
                id: 'driver_3',
                name: 'James Bond',
                description: `Boa noite, sou
                              James Bond. À seu dispor para um passeio
                              suave e discreto. Aperte o cinto e aproveite a viagem.`,
                car: 'Aston Martin DB5 clássico',
                rating: '5/5',
                comment: `Serviço impecável! O
                            motorista é a própria definição de classe e o
                            carro é simplesmente magnífico. Uma
                            experiência digna de um agente secreto.'
                        `,
                rate_per_km: 10.00,
                min_km: 10
            }
        ]))
    }
}

class GoogleApiRouteServiceSpy implements GoogleRoutesProtocol {
    async load(params: GoogleRoutesProtocol.Params): Promise<GoogleRoutesProtocol.Result> {
        return new Promise(resolve => resolve({
            routes: [
                {
                    legs: [
                        {
                            duration: '7699s',
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
            ],
        }))
    }
}

const makeSut = () => {
    const loadDriverRepositorySpy = new LoadDriverRepositorySpy()
    const googleApiRouteServiceSpy = new GoogleApiRouteServiceSpy()
    const sut = new RideEstimateUseCase(loadDriverRepositorySpy, googleApiRouteServiceSpy)

    return {
        sut,
        loadDriverRepositorySpy,
        googleApiRouteServiceSpy
    }
}

describe('RideEstimate UseCase', () => {
    it('Should calculate the route and return available drivers based on the distance', async () => {
        const { sut } = makeSut()

        const rideData: RideEstimate.Params = {
            customer_id: 'customer_123',
            origin: 'São Paulo',
            destination: 'Campinas',
        }

        const result = await sut.save(rideData)

        expect(result.options.length).toBeGreaterThan(0)
        expect(result.distance).toBeGreaterThan(0)
        expect(result.distance).toBe(152.48)
        expect(result.duration).toBe('2 horas 8 minutos')
    })

    it('Should return the correct fare for each driver based on distance', async () => {
        const { sut } = makeSut()

        const rideData: RideEstimate.Params = {
            customer_id: 'customer_123',
            origin: 'São Paulo',
            destination: 'Campinas',
        }

        const result = await sut.save(rideData)

        expect(result.options[0].value).toBeCloseTo(2.50 * 152.48, 2)
        expect(result.options[1].value).toBeCloseTo(5.00 * 152.48, 2)
        expect(result.options[2].value).toBeCloseTo(10.00 * 152.48, 2)
    })

    it('Should return no available drivers if none meet the distance criteria', async () => {
        const { sut, googleApiRouteServiceSpy } = makeSut()

        const rideData: RideEstimate.Params = {
            customer_id: 'customer_123',
            origin: 'São Paulo',
            destination: 'Belo Horizonte',
        }

        jest.spyOn(googleApiRouteServiceSpy, 'load').mockResolvedValueOnce({
            routes: [
                {
                    legs: [
                        {
                            duration: '500s',
                            startLocation: {
                                latLng: { latitude: -12.6718773, longitude: -39.1039333 },
                            },
                            endLocation: {
                                latLng: { latitude: -12.6728773, longitude: -39.1039333 },
                            },
                            distanceMeters: 500,
                            localizedValues: {
                                duration: { text: "8 minutos" },
                            },
                        },
                    ],
                },
            ],
        })

        await expect(sut.save(rideData)).rejects.toThrow(new NoAvailableDriversError('No drivers available for the requested distance.'))
    })

    it('Should throw an error if no drivers are available for the calculated distance', async () => {
        const { sut } = makeSut()

        const rideData: RideEstimate.Params = {
            customer_id: 'customer_123',
            origin: 'São Paulo',
            destination: 'Interior',
        }

        const result = await sut.save(rideData)

        expect(result.options.length).toBeGreaterThan(0)
    })
})