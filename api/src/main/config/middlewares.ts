import { Express } from 'express'
import { corsMiddleware } from '../middlewares/cors'
import { bodyParser } from '../middlewares/json-parser'

export default (app: Express): void => {
	app.use(bodyParser)
	app.use(corsMiddleware)
}