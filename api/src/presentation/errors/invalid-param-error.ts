import { CustomError } from "./custom-error";
export class InvalidParamError extends CustomError {
    constructor(param: string) {
        super('INVALID_DATA', `Invalid parameter: ${param}`);
    }
}
