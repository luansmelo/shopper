import { CustomError } from "@/domain/errors";
import { ServerError } from "../errors/server-error";
import { HttpResponse } from "../protocols/http-response.protocol";

export const badRequest = (error: CustomError): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error.stack!)
})

export const ok = (body: unknown): HttpResponse => ({
    statusCode: 200,
    body
})

export const notFound = (error: CustomError): HttpResponse => ({
    statusCode: 404,
    body: error
})