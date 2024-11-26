import { CustomerModel } from "@/domain/models/customer"

export interface LoadCustomerByEmailRepositoryProtocol {
    load(email: string): Promise<LoadCustomerByEmailRepositoryProtocol.Result | null>
}

export namespace LoadCustomerByEmailRepositoryProtocol {
    export type Result = CustomerModel | null
}