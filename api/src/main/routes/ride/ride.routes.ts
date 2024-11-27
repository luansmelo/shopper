import { Router } from "express";
import { adapt } from "../../adapters/express.adapter";
import { makeRideEstimateController } from "@/main/factories/ride-estimate.factory";
import { makeRideConfirmController } from "@/main/factories/ride-confirm.factory";
import { makeLoadRidesController } from "@/main/factories/load-rides.factory";

export default (route: Router): void => {
    route.post('/ride/estimate', adapt(makeRideEstimateController()))
    route.patch('/ride/confirm', adapt(makeRideConfirmController()))
    route.get('/ride/:customer_id?', adapt(makeLoadRidesController()))
}