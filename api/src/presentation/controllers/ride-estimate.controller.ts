import { RideEstimate } from "@/domain/usecases/ride-estimate"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../protocols"
import { MissingParamError } from "../errors/missing-param-error"
import { OriginEqualsDestinationError } from "@/domain/errors"

export class RideEstimateController implements Controller {
    constructor(private readonly rideUseCase: RideEstimate) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const body = httpRequest.body as RideEstimate.Params

            const requiredFields = ['customer_id', 'origin', 'destination']
            for (const field of requiredFields) {
                if (!body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            if (body.origin === body.destination) {
                return badRequest(new OriginEqualsDestinationError())
            }

            const result = await this.rideUseCase.save(body)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}