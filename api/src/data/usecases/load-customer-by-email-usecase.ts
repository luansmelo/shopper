import { MissingParamError } from "@/utils/errors/missing-param-error"
import { LoadCustomerByEmailRepositoryProtocol } from "../protocols/db/load-customer-by-email.repository"
import { LoadCustomerByEmail } from "@/domain/usecases/load-customer-by-email"

export class LoadCustomerByIdUseCase implements LoadCustomerByEmail {
    constructor(private readonly repository: LoadCustomerByEmailRepositoryProtocol) { }

    async load(email: string) {
        if (!email) throw new MissingParamError('email')

        const customer = await this.repository.load(email)

        if (!customer) throw new Error('Customer not found')
        return customer
    }
}