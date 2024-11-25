export interface HttpRequest {
    query?: unknown;
    headers?: unknown;
    body?: unknown;
    userId?: string;
    params?: unknown;
}

export class HttpResponse {
    static badRequest(paramName: string) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static serverError() {
        return {
            statusCode: 500,
            body: null,
        }
    }

    static ok(body: unknown) {
        return {
            statusCode: 200,
            body,
        }
    }
}

class MissingParamError extends Error {
    constructor(paramName: string) {
        super(`Missing param: ${paramName}`)
        this.name = paramName
    }
}

class CustomerRouter {
    route(httpRequest: HttpRequest) {
        if (!httpRequest.body) {
            return HttpResponse.serverError()
        }

        const body = httpRequest.body as { email?: string; name?: string };

        if (!body.email) {
            return HttpResponse.badRequest("email")
        }

        if (!body.name) {
            return HttpResponse.badRequest("name")
        }

        return HttpResponse.ok(body)
    }
}

describe('Customer Router', () => {
    it('Should return 400 if no email is provided', () => {
        const sut = new CustomerRouter()

        const httpRequest = {
            body: {
                name: 'any_name',
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    it('Should return 400 if no name is provided', () => {
        const sut = new CustomerRouter()

        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })

    it('Should return 200 if email and name is provided', () => {
        const sut = new CustomerRouter()

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@mail.com',
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse?.statusCode).toBe(200)
    })

    it('Should return 500 if no has body', () => {
        const sut = new CustomerRouter()

        const httpResponse = sut.route({})
        expect(httpResponse?.statusCode).toBe(500)
    })
})