import { CustomError } from "@/domain/errors";

export class MissingParamError extends CustomError {
    constructor(param: string) {
        super('MISSING_PARAM', `Missing parameter: ${param}`);
    }
}
