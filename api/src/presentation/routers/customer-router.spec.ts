class CustomerRouter {
    route(httpRequest: any) {
        if (!httpRequest.body.email) {
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
})