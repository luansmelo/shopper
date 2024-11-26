import { LoadCustomerByEmailRepositoryProtocol } from "@/data/protocols/db/load-customer-by-email.repository"
import { CustomerModel } from "./models/customer"
import { AddCustomerRepositoryProtocol } from "@/data/protocols"

export class LoadCustomerRepository implements AddCustomerRepositoryProtocol, LoadCustomerByEmailRepositoryProtocol {
    async save(data: AddCustomerRepositoryProtocol.Params): Promise<AddCustomerRepositoryProtocol.Result> {
        const customer = await CustomerModel.create(data)
        return customer.get({ plain: true })
    }

    async load(email: string): Promise<LoadCustomerByEmailRepositoryProtocol.Result | null> {
        const customer = await CustomerModel.findOne({ where: { email } })
        if (!customer) return null
        return customer.get({ plain: true })
    }
}