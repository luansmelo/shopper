export class OriginEqualsDestinationError extends Error {
    constructor() {
        super('Origin and destination cannot be the same');
        this.name = 'OriginEqualsDestinationError';
    }
}