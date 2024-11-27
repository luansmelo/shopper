import { AddCustomer } from "@/domain/usecases/add-customer"
import { Controller, HttpRequest, HttpResponse } from "../protocols"
import { EmailValidator } from "@/validations/protocols/email-validator"
import { badRequest, ok } from "../helpers/http-helper"
import { errorHandler } from "../helpers/handlers/error-handler"
import { InvalidParamError } from "../errors/invalid-param-error"

export class AddCustomerController implements Controller {
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
            return errorHandler(error)
        }
    }
}