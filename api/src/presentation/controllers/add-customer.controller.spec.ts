import { EmailValidator } from "@/validators/protocols/email-validator"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { AddCustomer } from "@/domain/usecases/add-customer"
import { Controller, HttpRequest, HttpResponse } from "../protocols"
import { InvalidParamError } from "../errors"

class AddCustomerController implements Controller {
    constructor(
        private readonly addCustomerUseCase: AddCustomer,
        private readonly validation: EmailValidator
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const body = httpRequest.body as AddCustomer.Params

            if (!this.validation.isValid(body.email)) {
                return badRequest(new InvalidParamError('email'))
            }

            const result = await this.addCustomerUseCase.save(body)
            return ok(result)
        } catch (error) {
            return serverError()
        }
    }
}

const makeSut = () => {
    const emailValidatorSpy = makeEmailValidator()
    const addCustomerUseCaseSpy = makeAddCustomerUseCaseSpy()
    const sut = new AddCustomerController(addCustomerUseCaseSpy, emailValidatorSpy)

    return {
        sut,
        emailValidatorSpy,
        addCustomerUseCaseSpy
    }
}

const makeAddCustomerUseCaseSpy = () => {
    class AddCustomerUseCaseSpy implements AddCustomer {
        async save(customer: AddCustomer.Params): Promise<AddCustomer.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                name: 'any_name',
                email: 'any_email'
            }))
        }
    }
    return new AddCustomerUseCaseSpy()
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

describe('AddCustomer Controller', () => {

    it('should call handle with correct values', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email'
        })
    })

    it('should call save with correct values', async () => {
        const { sut, addCustomerUseCaseSpy } = makeSut()
        const saveSpy = jest.spyOn(addCustomerUseCaseSpy, 'save')

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
            },
        }
        await sut.handle(httpRequest)
        expect(saveSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('should call validation with correct values', async () => {
        const { sut, emailValidatorSpy } = makeSut()
        const validationSpy = jest.spyOn(emailValidatorSpy, 'isValid')

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email'
            }
        }
        await sut.handle(httpRequest)
        expect(validationSpy).toHaveBeenCalledWith('any_email')
    })

    it('should return 400 if validation returns error', async () => {
        const { sut, emailValidatorSpy } = makeSut()
        jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                name: 'any name',
                email: 'any email'
            },
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    it('should return a customer if email customer exist', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email' 
            }
        }

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email'
        })
    })
})
