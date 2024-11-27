import { CustomerModel } from "@/domain/models/customer"
import { LoadCustomerByEmailRepositoryProtocol } from "../protocols/db/load-customer-by-email.repository"
import { LoadCustomerByEmail } from "@/domain/usecases/load-customer-by-email"

export class LoadCustomerByEmailUseCase implements LoadCustomerByEmail {
    constructor(private readonly repository: LoadCustomerByEmailRepositoryProtocol) { }

    async load(email: string): Promise<CustomerModel | null> {
        const customer = await this.repository.load(email)
        if (!customer) return null
        return customer
    }
}