import { EmailValidator } from "@/validators/protocols/email-validator";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { HttpRequest } from "../protocols/http-request.protocol";
import { HttpResponse } from "../protocols/http-response.protocol";
import { InvalidParamError } from "../../utils/errors/invalid-param-error";
import { MissingParamError } from "@/utils/errors/missing-param-error";

export class CustomerRouter {
    constructor(
        private readonly customerUseCase: any,
        private readonly validation: EmailValidator
    ) { }

    route(httpRequest: HttpRequest): HttpResponse {
        try {
            const body = httpRequest.body as { email?: string, name?: string }

            if (!body.email) {
                return badRequest(new MissingParamError('email'))
            }

            if (!this.validation.isValid(body.email)) {
                return badRequest(new InvalidParamError('email'))
            }

            if (!body.name) {
                return badRequest(new MissingParamError('name'))
            }

            const result = this.customerUseCase.save(body.email, body.name)

            return ok(result)
        } catch (error) {
            return serverError()
        }
    }
}
