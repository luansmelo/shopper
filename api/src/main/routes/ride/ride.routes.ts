import { Router } from "express";
import { adapt } from "../../adapters/express.adapter";
import { makeRideEstimateController } from "@/main/factories/ride-estimate.factory";

export default (route: Router): void => {
    route.post('/ride/estimate', adapt(makeRideEstimateController()))
}