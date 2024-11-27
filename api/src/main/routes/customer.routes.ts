import { Router } from "express";
import { adapt } from "../adapters/express.adapter";
import { makeAddCustomerController } from "../factories/add-customer.factory";

export default (route: Router): void => {
    const customerRouter = Router()
    customerRouter.post('/', adapt(makeAddCustomerController()))

    route.use('/customers', customerRouter)
}