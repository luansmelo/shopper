import { MissingParamError } from "@/utils/errors/missing-param-error"

interface CustomerResponse {
    name: string,
    email: string
}

class LoadCustomerByEmailRepositorySpy {
    private customer: CustomerResponse = { name: 'Janja', email: '' }

    async load(email: string) {
        if (email) this.customer.email = email
        return this.customer
    }
}

class CustomerUseCase {
    constructor(private readonly repository: LoadCustomerByEmailRepositorySpy) { }

    async save(email?: string, name?: string) {
        if (!email) throw new MissingParamError('email')
        if (!name) throw new MissingParamError('name')

        return await this.repository.load(email)
    }
}

const makeSut = () => {
    const loadCustomerByEmailRepository = new LoadCustomerByEmailRepositorySpy()
    const sut = new CustomerUseCase(loadCustomerByEmailRepository)

    return {
        sut,
        loadCustomerByEmailRepository
    }
}

describe('Customer UseCase', () => {
    it('Should throw if no email is provided', async () => {
        const { sut } = makeSut()
        const promise = sut.save()
        expect(promise).rejects.toThrow()
    })

    it('Should throw if no name is provided', async () => {
        const { sut } = makeSut()
        const promise = sut.save('email@mail.com')
        expect(promise).rejects.toThrow()
    })

    it('Should call LoadCustomerByEmailRepository with correct email', async () => {
        const { sut, loadCustomerByEmailRepository } = makeSut()

        await sut.save('email@mail.com', 'janja')

        const load = await loadCustomerByEmailRepository.load('email@mail.com')
        expect(load.email).toBe('email@mail.com')
    })

    it('Should return customer data when email is provided', async () => {
        const { sut } = makeSut()

        const customer = await sut.save('email@mail.com', 'Janja')
        expect(customer).toEqual({ email: 'email@mail.com', name: 'Janja' })
    })
})