import { EmailValidator } from "@/validators/protocols/email-validator"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest } from "../helpers/http-helper"
import { CustomerRouter } from "./customer-router"
import { InvalidParamError } from "../errors/invalid-param-error"

const makeSut = () => {
    const emailValidatorSpy = makeEmailValidator()
    const customerUseCaseSpy = makeCustomerUseCaseSpy()
    const sut = new CustomerRouter(customerUseCaseSpy, emailValidatorSpy)

    return {
        sut,
        emailValidatorSpy,
        customerUseCaseSpy
    }
}

const makeCustomerUseCaseSpy = () => {
    class CustomerUseCaseSpy {
        public email!: string
        public name!: string

        save(email: string, name: string) {
            this.email = email
            this.name = name
        }
    }
    return new CustomerUseCaseSpy()
}

const makeEmailValidator = () => {
    class EmailValidatorSpy implements EmailValidator {
        isValid(input: unknown): boolean {
            return true
        }
    }

    return new EmailValidatorSpy()
}

const makeCustomerUseCaseSpyWithError = () => {
    class CustomerUseCaseSpyWithError {
        save() {
            throw new Error();
        }
    }
    return new CustomerUseCaseSpyWithError()
}

describe('Customer Router', () => {

    it('Should return 400 if no email is provided', () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                name: 'any_name',
            }
        }

        const httpResponse = sut.route(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
    })

    it('Should return 400 if no name is provided', () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
            }
        }

        const httpResponse = sut.route(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')));
    })

    it('Should return 200 if email and name is provided', () => {
        const { sut } = makeSut()

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
        const { sut } = makeSut()

        const httpResponse = sut.route({})
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual({
            error: 'Internal Server Error'
        })
    })

    it('Should call CustomerUseCase with correct params', () => {
        const { sut, customerUseCaseSpy } = makeSut()

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@mail.com',
            }
        }

        sut.route(httpRequest)

        expect(customerUseCaseSpy.name).toBe(httpRequest.body.name)
        expect(customerUseCaseSpy.email).toBe(httpRequest.body.email)
    })

    it('Should return 500 if CustomerUseCase throws', () => {
        const customerUseCaseSpy = makeCustomerUseCaseSpyWithError()
        const sut = new CustomerRouter(customerUseCaseSpy, makeEmailValidator())

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@mail.com',
            }
        };

        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual({
            error: 'Internal Server Error'
        });
    });

    it('Should return 400 if email is invalid', () => {
        const { sut, emailValidatorSpy } = makeSut();

        jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValue(false)

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email',
            },
        };

        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
    });
})
