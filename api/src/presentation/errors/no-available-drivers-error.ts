export class NoAvailableDriversError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoAvailableDriversError";
    }
}