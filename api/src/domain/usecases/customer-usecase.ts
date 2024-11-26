import { MissingParamError } from "@/utils/errors/missing-param-error"

export class CustomerUseCase {
    constructor(private readonly repository: any) { }

    async save(email: string, name: string) {
        if (!email) throw new MissingParamError('email')
        if (!name) throw new MissingParamError('name')

        return await this.repository.load(email)
    }
}