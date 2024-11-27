import { CustomError } from "./custom-error";

export class MissingParamError extends CustomError {
    constructor(param: string) {
        super('MISSING_PARAM', `Missing parameter: ${param}`);
    }
}
