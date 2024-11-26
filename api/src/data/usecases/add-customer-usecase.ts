import { AddCustomer } from "@/domain/usecases/add-customer"
import { AddCustomerRepositoryProtocol, LoadCustomerByEmailRepositoryProtocol } from "../protocols"

export class AddCustomerUseCase implements AddCustomer {
    constructor(
        private readonly repository: LoadCustomerByEmailRepositoryProtocol,
        private readonly addCustomerRepository: AddCustomerRepositoryProtocol
    ) { }

    async save(data: AddCustomer.Params): Promise<AddCustomer.Result> {
        const customer = await this.repository.load(data.email)
        if (customer) return customer

        return this.addCustomerRepository.save(data)
    }
}