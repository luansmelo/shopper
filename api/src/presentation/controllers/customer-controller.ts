import { EmailValidator } from "@/validators/protocols/email-validator";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { LoadCustomerByEmail } from "@/domain/usecases/load-customer-by-email";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class LoadCustomerByEmailController implements Controller {
    constructor(
        private readonly customerUseCase: LoadCustomerByEmail,
        private readonly validation: EmailValidator
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const param = httpRequest.params as { email: string }

            if (!param.email) {
                return badRequest(new MissingParamError('email'))
            }

            if (!this.validation.isValid(param.email)) {
                return badRequest(new InvalidParamError('email'))
            }

            const result = await this.customerUseCase.load(param.email)

            return ok(result)
        } catch (error) {
            return serverError()
        }
    }
}
