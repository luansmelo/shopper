import { AxiosHttpClient } from "@/infra/gateways/http-client"

export const makeAxiosHttpClient = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}