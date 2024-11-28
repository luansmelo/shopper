import { ok } from "../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { errorHandler } from "../helpers/handlers/error-handler";
import { LoadDrivers } from "@/domain/usecases/load-drivers";

export class LoadDriversController implements Controller {
    constructor(private readonly drivers: LoadDrivers) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const drivers = await this.drivers.load()

            return ok(drivers)
        } catch (error) {
            console.log(error)
            return errorHandler(error)
        }
    }
}
