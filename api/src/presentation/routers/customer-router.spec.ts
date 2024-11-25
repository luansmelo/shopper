import { CustomerRouter } from "./customer-router"

const makeSut = () => {
    return new CustomerRouter()
}

describe('Customer Router', () => {

    it('Should return 400 if no email is provided', () => {
        const sut = makeSut()

        const httpRequest = {
            body: {
                name: 'any_name',
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            error: "Missing param: email"
        });
    })

    it('Should return 400 if no name is provided', () => {
        const sut = makeSut()

        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            error: "Missing param: name"
        });
    })

    it('Should return 200 if email and name is provided', () => {
        const sut = makeSut()

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@mail.com',
            }
        }

        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
    })

    it('Should return 500 if no has body', () => {
        const sut = makeSut()

        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual({
            error: 'Internal Server Error'
        })
    })

   
})