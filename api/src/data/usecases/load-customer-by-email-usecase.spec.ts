import { LoadCustomerByEmailRepositoryProtocol } from "../protocols/db/load-customer-by-email.repository"
import { LoadCustomerByEmailUseCase } from "./load-customer-by-email-usecase"

class LoadCustomerByEmailRepositorySpy implements LoadCustomerByEmailRepositoryProtocol {
    async load(email: string): Promise<LoadCustomerByEmailRepositoryProtocol.Result | null> {
        return new Promise(resolve => resolve({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email'
        }))
    }
}

const makeSut = () => {
    const loadCustomerByEmailRepository = new LoadCustomerByEmailRepositorySpy()
    const sut = new LoadCustomerByEmailUseCase(loadCustomerByEmailRepository)

    return {
        sut,
        loadCustomerByEmailRepository
    }
}

describe('LoadCustomerByEmail UseCase', () => {
    it('Should throw if no email is provided', async () => {
        const { sut } = makeSut()
        const promise = sut.load('')
        expect(promise).rejects.toThrow()
    })

    it('Should throw if no customer no found', async () => {
        const { sut, loadCustomerByEmailRepository } = makeSut()
        jest.spyOn(loadCustomerByEmailRepository, 'load').mockImplementationOnce(() => {
            throw new Error()
        })

        const promise = sut.load('email_fake@mail.com')
        expect(promise).rejects.toThrow()
    })

    it('Should call LoadCustomerByEmailRepository with correct email', async () => {
        const { sut } = makeSut()

        const load = await sut.load('any_email')

        expect(load?.email).toBe('any_email')
    })

    it('Should return customer data when email is provided', async () => {
        const { sut } = makeSut()

        const customer = await sut.load('any_email')

        expect(customer).toEqual({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email'
        })
    })
})