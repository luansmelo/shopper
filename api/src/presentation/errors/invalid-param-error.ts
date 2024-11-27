import { CustomError } from "@/domain/errors";

export class InvalidParamError extends CustomError {
    constructor(param: string) {
        super('INVALID_PARAM', `Invalid parameter: ${param}`);
    }
}
