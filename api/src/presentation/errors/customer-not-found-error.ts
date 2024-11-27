import { CustomError } from "./custom-error";

export class CustomerNotFoundError extends CustomError {
    constructor() {
        super('NO_CUSTOMER_FOUND', 'Customer with the given email was not found');
    }
}
