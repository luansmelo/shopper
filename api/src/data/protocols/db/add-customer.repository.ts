import { AddCustomer } from "@/domain/usecases/add-customer"

export namespace AddCustomerRepositoryProtocol {
    export type Params = AddCustomer.Params
    export type Result = AddCustomer.Result
}

export interface AddCustomerRepositoryProtocol {
    save(data: AddCustomerRepositoryProtocol.Params): Promise<AddCustomerRepositoryProtocol.Result>
}