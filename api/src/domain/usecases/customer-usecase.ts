import { MissingParamError } from "@/utils/errors/missing-param-error"
import { LoadCustomerByEmailRepositoryContract } from "../repositories/load-customer-by-email.repository"

export class CustomerUseCase {
    constructor(private readonly repository: LoadCustomerByEmailRepositoryContract) { }

    async save(email: string, name: string) {
        if (!email) throw new MissingParamError('email')
        if (!name) throw new MissingParamError('name')

        const customer = await this.repository.load(email)

        if (!customer) throw new Error('Customer not found')
        return customer
    }
}