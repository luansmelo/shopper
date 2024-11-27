import { MockHttpClient } from "@/data/mocks/http-client.mock"
import { GoogleRoutesProtocol } from "../protocols/google.routes-protocol"
import { GoogleRoutesGateway } from "./google-routes"

describe('GoogleRoutesGateway', () => {
    let googleRoutesGateway: GoogleRoutesGateway
    let mockHttpClient: MockHttpClient

    beforeEach(() => {
        mockHttpClient = new MockHttpClient()
        googleRoutesGateway = new GoogleRoutesGateway(mockHttpClient)
    })

    it('Should return route data with distance, duration, and locations', async () => {
        const mockResponse = {
            routes: [
                {
                    legs: [
                        {
                            distanceMeters: 1000,
                            duration: '15 minutes',
                            startLocation: {
                                latLng: {
                                    latitude: 10.0,
                                    longitude: 20.0
                                }
                            },
                            endLocation: {
                                latLng: {
                                    latitude: 10.1,
                                    longitude: 20.1
                                }
                            },
                            localizedValues: {
                                duration: { text: '15 minutes' }
                            }
                        }
                    ]
                }
            ]
        }

        mockHttpClient.response = { data: mockResponse }

        const params: GoogleRoutesProtocol.Params = {
            origin: 'São Paulo',
            destination: 'Belo Horizonte'
        }

        const result = await googleRoutesGateway.load(params)

        const route = result.routes[0]
        const leg = route.legs[0]

        expect(route.legs).toHaveLength(1)
        expect(leg).toEqual({
            distanceMeters: 1000,
            duration: '15 minutes',
            startLocation: { latLng: { latitude: 10.0, longitude: 20.0 } },
            endLocation: { latLng: { latitude: 10.1, longitude: 20.1 } },
            localizedValues: {
                duration: { text: '15 minutes' }
            }
        })
    })

    it('Should handle errors properly', async () => {
        mockHttpClient.error = new Error('Simulated error')

        const params: GoogleRoutesProtocol.Params = {
            origin: 'São Paulo',
            destination: 'Belo Horizonte'
        }

        await expect(googleRoutesGateway.load(params)).rejects.toThrow('Simulated error')
    })
})
