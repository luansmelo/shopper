import { CustomError } from "./custom-error";

export class NoRoutesFoundError extends CustomError {
    constructor() {
        super('NO_ROUTES_FOUND', 'No routes found for the given origin and destination');
    }
}
