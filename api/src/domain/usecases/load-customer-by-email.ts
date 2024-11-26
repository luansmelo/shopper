import { CustomerModel } from "../models/customer";

export interface LoadCustomerByEmail {
    load(email: string): Promise<CustomerModel>
}

