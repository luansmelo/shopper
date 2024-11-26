import { Customer, LoadCustomerByEmailRepositoryContract } from "@/domain/repositories/load-customer-by-email.repository"
import { CustomerModel } from "./models/customer"

export class LoadCustomerByEmailRepository implements LoadCustomerByEmailRepositoryContract {
    async load(email: string): Promise<Customer.Result | null> {
        const customer = await CustomerModel.findOne({ where: { email } })
        if (!customer) return null
        return customer.get({ plain: true })
    }
}