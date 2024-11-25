export interface HttpRequest {
    query?: unknown;
    headers?: unknown;
    body?: unknown;
    userId?: string;
    params?: unknown;
}

export interface HttpResponse {
    statusCode: number
}

class CustomerRouter {
    route(httpRequest: HttpRequest): HttpResponse {
        const body = httpRequest.body as { email?: string; name?: string };

        if (!body.email || !body.name) {
            return {
                statusCode: 400
            }
        }

        return {
            statusCode: 200
        }
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
        expect(httpResponse?.statusCode).toBe(400)
    })

    it('Should return 400 if no name is provided', () => {
        const sut = new CustomerRouter()

        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse?.statusCode).toBe(400)
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
})