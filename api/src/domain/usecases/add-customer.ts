import { CustomerModel } from "../models/customer"

export interface AddCustomer {
    save(customer: AddCustomer.Params): Promise<AddCustomer.Result>
}

export namespace AddCustomer {
    export type Params = {
        name: string,
        email: string
    }

    export type Result = CustomerModel
}