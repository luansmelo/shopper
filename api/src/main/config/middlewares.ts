import { Express } from 'express'
import { corsMiddleware } from '../middlewares/cors'
import { bodyParser } from '../middlewares/json-parser'
import { contentTypeJson } from '../middlewares/content-type'

export default (app: Express): void => {
	app.use(bodyParser)
	app.use(corsMiddleware)
	app.use(contentTypeJson)
}