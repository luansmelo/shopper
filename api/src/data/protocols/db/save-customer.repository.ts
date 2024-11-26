export namespace Customer {
    export type Result = {
        name: string,
        email: string
    }
}

export interface LoadCustomerByEmailRepositoryContract {
    load(email: string): Promise<Customer.Result | null>
}