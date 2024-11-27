export interface HttpClientProtocol<T = any> {
    request(data: HttpClientProtocol.Request): Promise<HttpClientProtocol.Response<T>>
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export namespace HttpClientProtocol {
    export type Request = {
        url: string
        method: HttpMethod
        headers?: Record<string, string>
        body?: any
    }

    export type Response<T = any> = {
        data: T
    }
}
