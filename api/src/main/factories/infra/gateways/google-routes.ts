import { GoogleRoutesGateway } from "@/infra/gateways/google-routes"
import { makeAxiosHttpClient } from "./http-client"

export const makeGoogleRoutesGateway = (): GoogleRoutesGateway => {
    return new GoogleRoutesGateway(makeAxiosHttpClient())
}