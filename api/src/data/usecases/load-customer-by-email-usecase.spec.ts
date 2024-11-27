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
    it('Should return null if LoadCustomerByEmailRepository returns null', async () => {
        const { sut, loadCustomerByEmailRepository } = makeSut()

        jest.spyOn(loadCustomerByEmailRepository, 'load').mockImplementationOnce(() => null)
        
        const model = await sut.load('email_fake@mail.com')
        expect(model).toBeNull()
    })

    it('Should call LoadCustomerByEmailRepository with correct email', async () => {
        const { sut } = makeSut()

        const load = await sut.load('any_email')

        expect(load?.email).toBe('any_email')
    })

    it('Should return a customer on sucess', async () => {
        const { sut } = makeSut()

        const customer = await sut.load('any_email')

        expect(customer).toEqual({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email'
        })
    })
})