export class CustomError extends Error {
    error_code: string
    error_description: string

    constructor(error_code: string, error_description: string) {
        super(error_description)
        this.error_code = error_code
        this.error_description = error_description
    }
}
