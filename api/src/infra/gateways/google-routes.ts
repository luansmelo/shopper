import { GoogleRoutesProtocol } from "../protocols/google.routes-protocol"
import { HttpClientProtocol, HttpMethod } from "../protocols/http-client-protocol"

export class GoogleRoutesGateway implements GoogleRoutesProtocol {
    constructor(private readonly httpClient: HttpClientProtocol) { }

    async load(params: GoogleRoutesProtocol.Params): Promise<GoogleRoutesProtocol.Result> {
        const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'

        const requestParams = {
            url: url,
            method: 'POST' as HttpMethod,
            headers: {
                'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                'X-Goog-FieldMask': 'routes',
                'Content-Type': 'application/json'
            },
            body: {
                origin: {
                    address: params.origin,
                },
                destination: {
                    address: params.destination
                },
                travelMode:'DRIVE'
            }
        }

        const response = await this.httpClient.request(requestParams)
        console.log(response)
        const routes = response.data.routes.map(route => ({
            legs: route.legs.map(leg => ({
                distanceMeters: leg.distanceMeters,
                duration: leg.duration,
                startLocation: leg.startLocation,
                endLocation: leg.endLocation,
                localizedValues: leg.localizedValues,
            }))
        }))

        return { routes }
    } catch(error) {
        console.error('Error fetching route data:', error.response ? error.response.data : error.message);
        throw new Error(error.response && error.response.data)
    }
}
