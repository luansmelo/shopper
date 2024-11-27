import axios, { AxiosResponse } from 'axios'
import { HttpClientProtocol } from '../protocols/http-client-protocol'

export class HttpClientAdapter implements HttpClientProtocol {
    async request(params: HttpClientProtocol.Request): Promise<HttpClientProtocol.Response> {
        const { data }: AxiosResponse = await axios.request({
            url: params.url,
            method: params.method,
            headers: params.headers,
            data: params.body,
        })

        return { data }
    }
}
