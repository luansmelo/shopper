import { CustomError } from "../errors";
import { HttpResponse } from "../protocols/http-response.protocol";

export const badRequest = (error: CustomError): HttpResponse => ({
    statusCode: 400,
    body: error 
})

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: {
        error: 'Erro interno do servidor'
    }
})

export const ok = (body: unknown): HttpResponse => ({
    statusCode: 200,
    body
})

export const notFound = (error: CustomError): HttpResponse => ({
    statusCode: 404,
    body: error
})