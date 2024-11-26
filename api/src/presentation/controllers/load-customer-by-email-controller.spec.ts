import { EmailValidator } from "@/validators/protocols/email-validator";
import { badRequest } from "../helpers/http-helper";
import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { LoadCustomerByEmailController } from "./load-customer-by-email.controller";
import { LoadCustomerByEmail } from "@/domain/usecases/load-customer-by-email";
import { CustomerModel } from "@/domain/models/customer";

const httpRequest = {
    params: {
        email: 'any_mail@mail.com'
    }
}

const makeSut = () => {
    const emailValidatorSpy = makeEmailValidator()
    const customerUseCaseSpy = makeCustomerUseCaseSpy()
    const sut = new LoadCustomerByEmailController(customerUseCaseSpy, emailValidatorSpy)

    return {
        sut,
        emailValidatorSpy,
        customerUseCaseSpy
    }
}

const makeCustomerUseCaseSpy = () => {
    class CustomerUseCaseSpy implements LoadCustomerByEmail {

        email: string = ''

        async load(email: string): Promise<CustomerModel> {
            this.email = email
            return new Promise(resolve => resolve({
                id: 'any_id',
                name: 'any_name',
                email: email
            }))
        }
    }
    return new CustomerUseCaseSpy()
}

const makeEmailValidator = () => {
    class EmailValidatorSpy implements EmailValidator {
        email: string = ''

        isValid(email: string): boolean {
            this.email = email
            return true
        }
    }

    return new EmailValidatorSpy()
}

describe('LoadCustomerByEmail Controller', () => {

    it('Should return 200 if LoadCustomerByEmail retuns a customer', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            id: 'any_id',
            name: 'any_name',
            email: 'any_mail@mail.com'
        })
    })

    it('Should return 400 if no email is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            params: {
                email: ''
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })

    it('Should call CustomerUseCase with correct params', async () => {
        const { sut, customerUseCaseSpy } = makeSut()

        await sut.handle(httpRequest)
        expect(customerUseCaseSpy.email).toBe(httpRequest.params.email)
    })

    it('Should return 500 if CustomerUseCase throws', async () => {
        const { sut, customerUseCaseSpy } = makeSut()
        jest.spyOn(customerUseCaseSpy, 'load').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    it('Should return 400 if email is invalid', async () => {
        const { sut, emailValidatorSpy } = makeSut()

        jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValue(false)

        const httpRequest = {
            params: {
                email: 'invalid_email',
            },
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    it('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorSpy } = makeSut()
        const validateSpy = jest.spyOn(emailValidatorSpy, 'isValid')

        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.params.email)
    })
})
