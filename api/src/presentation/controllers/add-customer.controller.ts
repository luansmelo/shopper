import { AddCustomer } from "@/domain/usecases/add-customer"
import { Controller, HttpRequest, HttpResponse } from "../protocols"
import { EmailValidator } from "@/validators/protocols/email-validator"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { InvalidParamError } from "../errors"

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
            return serverError(error)
        }
    }
}