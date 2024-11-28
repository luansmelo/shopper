import { Router } from "express";
import { adapt } from "../../adapters/express.adapter";
import { makeLoadDriversController } from "@/main/factories/load-drivers.factory";

export default (route: Router): void => {
    route.get('/driver', adapt(makeLoadDriversController()))
}