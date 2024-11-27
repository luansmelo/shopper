import { badRequest, ok } from "../helpers/http-helper";
import { MissingParamError } from "@/presentation/errors/missing-param-error";
import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { errorHandler } from "../helpers/handlers/error-handler";
import { LoadRides } from "@/domain/usecases/load-rides";

export class LoadRidesController implements Controller {
    constructor(private readonly rides: LoadRides) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const param = httpRequest.params as { customer_id: number }
            const query = httpRequest.query as { driver_id: number }

            if (!param.customer_id) {
                return badRequest(new MissingParamError('email'))
            }

            const rides = await this.rides.load({
                customer_id: param.customer_id,
                driver_id: query.driver_id
            })

            return ok(rides)
        } catch (error) {
            console.log(error)
            return errorHandler(error)
        }
    }
}
