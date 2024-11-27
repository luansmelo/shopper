import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export const adapt = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            headers: req.headers,
            query: req.query,
            body: req.body,
            params: req.params,
        }

        const httpResponse: HttpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}