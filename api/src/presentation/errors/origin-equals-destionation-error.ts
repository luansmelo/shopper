import { CustomError } from "./custom-error";

export class OriginEqualsDestinationError extends CustomError {
    constructor() {
        super('ORIGIN_EQUALS_DESTINATION', 'Origin and destination cannot be the same');
    }
}