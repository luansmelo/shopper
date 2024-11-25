import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { HttpRequest } from "../protocols/http-request.protocol";
import { HttpResponse } from "../protocols/http-response.protocol";

export class CustomerRouter {
    constructor(private readonly customerUseCase: any) { }

    route(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body) {
            return serverError()
        }

        const body = httpRequest.body as { email?: string; name?: string };

        if (!body.email) {
            return badRequest(new MissingParamError('email'))
        }

        if (!body.name) {
            return badRequest(new MissingParamError('name'))
        }

        const result = this.customerUseCase.save(body.email, body.name)

        return ok(result)
    }
}
