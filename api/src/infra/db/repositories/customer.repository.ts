import { LoadCustomerByEmailRepositoryProtocol } from "@/data/protocols/db/load-customer-by-email.repository"
import { CustomerModel } from "./models/customer"

export class LoadCustomerRepository implements LoadCustomerByEmailRepositoryProtocol {
    async load(email: string): Promise<LoadCustomerByEmailRepositoryProtocol.Result | null> {
        const customer = await CustomerModel.findOne({ where: { email } })
        if (!customer) return null
        return customer.get({ plain: true })
    }
}