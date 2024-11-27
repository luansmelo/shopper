import { Router } from "express";
import { adapt } from "../../adapters/express.adapter";
import { makeAddCustomerController } from "../../factories/add-customer.factory";
import { makeLoadCustomerByEmailController } from "@/main/factories/load-customer.factory";

export default (route: Router): void => {
    route.post('/customers', adapt(makeAddCustomerController()))
    route.get('/customers/:email', adapt(makeLoadCustomerByEmailController()))
}