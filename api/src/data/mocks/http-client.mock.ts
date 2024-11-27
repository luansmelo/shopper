import { HttpClientProtocol } from "@/infra/protocols/http-client-protocol"

export class MockHttpClient<T = any> implements HttpClientProtocol<T> {
    response: HttpClientProtocol.Response<T> | null = null
    error: Error | null = null

    async request(data: HttpClientProtocol.Request): Promise<HttpClientProtocol.Response<T>> {
        if (this.error) {
            throw this.error
        }
        return this.response as HttpClientProtocol.Response<T>
    }
}
