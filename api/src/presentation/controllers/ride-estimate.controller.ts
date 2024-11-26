import { RideEstimate } from "@/domain/usecases/ride-estimate"
import { ok, serverError } from "../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../protocols"

export class RideEstimateController implements Controller {
    constructor(private readonly rideUseCase: RideEstimate) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const body = httpRequest.body as RideEstimate.Params

            const result = await this.rideUseCase.save(body)

            return ok(result)
        } catch (error) {
            return serverError()
        }
    }
}