import { LoadDriversRepositoryProtocol } from "@/data/protocols/db/load-driver.repository"
import { DriverModel } from "../models/driver"

export class DriverRepository implements LoadDriversRepositoryProtocol {
    async load(): Promise<LoadDriversRepositoryProtocol.Result[]> {
        return await DriverModel.findAll()
    }
}