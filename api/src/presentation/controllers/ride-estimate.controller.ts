import { RideEstimate } from "@/domain/usecases/ride-estimate"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../protocols"
import { MissingParamError } from "../errors/missing-param-error"

export class RideEstimateController implements Controller {
    constructor(private readonly rideUseCase: RideEstimate) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const body = httpRequest.body as RideEstimate.Params

            const requiredFields: Array<keyof RideEstimate.Params> = ['customer_id', 'origin', 'destination']
            for (const field of requiredFields) {
                if (!body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const result = await this.rideUseCase.save(body)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}