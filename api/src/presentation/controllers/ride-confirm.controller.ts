import { ok } from "../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../protocols"
import { errorHandler } from "../helpers/handlers/error-handler"
import { RideConfirm } from "@/domain/usecases/ride-confirm"

export class RideConfirmController implements Controller {
    constructor(private readonly rideUseCase: RideConfirm) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const body = httpRequest.body as RideConfirm.Params

            const result = await this.rideUseCase.save(body)

            return ok(result)
        } catch (error) {
            console.log(error)
            return errorHandler(error)
        }
    }
}