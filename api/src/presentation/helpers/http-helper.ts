import { HttpResponse } from "../protocols/http-response.protocol";

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: {
        error: error.message
    }
})

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: {
        error: 'Internal Server Error'
    }
})

export const ok = (body: unknown): HttpResponse => ({
    statusCode: 200,
    body
})