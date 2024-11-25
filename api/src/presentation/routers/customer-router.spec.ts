class CustomerRouter {
    route(httpRequest: any) {
        if (!httpRequest.body.email || !httpRequest.body.name) {
            return {
                statusCode: 400
            }
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
})