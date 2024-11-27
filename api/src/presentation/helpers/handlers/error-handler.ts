import { HttpResponse } from "@/presentation/protocols"
import { readdirSync } from "fs"
import { CustomError } from "../../errors/custom-error"
import { badRequest, serverError } from "../http-helper"

export async function errorHandler(error: unknown): Promise<HttpResponse> {
    if (error instanceof CustomError) {
        return badRequest(error)
    }

    const errors: Error[] = []
    const files = readdirSync(`${__dirname}/../../errors`)
    for (const file of files) {
        const errorModule = await import(`../../errors/${file}`)
        const errorClass = Object.values(errorModule).find(
            (value) => typeof value === "function" && value.prototype instanceof Error
        )

        if (errorClass) {
            errors.push(errorClass as Error)
        }
    }

    if (errors.some((errorItem) => error instanceof (errorItem as never))) {
        return badRequest(error as CustomError)
    }

    return serverError()
}
