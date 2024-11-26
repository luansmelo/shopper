import { AddCustomer } from "@/domain/usecases/add-customer"
import { LoadCustomerByEmailRepositoryProtocol } from "../protocols/db/load-customer-by-email.repository"
import { AddCustomerRepositoryProtocol } from "../protocols"

const makeLoadCustomerbyEmailStub = () => {
    class LoadCustomerByEmailRepository implements LoadCustomerByEmailRepositoryProtocol {
        async load(email: string): Promise<LoadCustomerByEmailRepositoryProtocol.Result | null> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new LoadCustomerByEmailRepository()
}

const makeAddCustomerRepositoryStub = () => {
    class AddCustomerRepositoryStub implements AddCustomerRepositoryProtocol {
        async save(data: AddCustomerRepositoryProtocol.Params): Promise<AddCustomerRepositoryProtocol.Result> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                name: 'any_name',
                email: 'any_email'
            }))
        }
    }
    return new AddCustomerRepositoryStub()
}

class AddCustomerUseCase implements AddCustomer {
    constructor(
        private readonly repository: LoadCustomerByEmailRepositoryProtocol,
        private readonly addCustomerRepository: AddCustomerRepositoryProtocol
    ) { }

    async save(data: AddCustomer.Params): Promise<AddCustomer.Result> {
        const customer = await this.repository.load(data.email)
        if (customer) return customer

        return this.addCustomerRepository.save(data)
    }
}

const makeSut = () => {
    const loadCustomerByEmailRepository = makeLoadCustomerbyEmailStub()
    const addCustomerRepository = makeAddCustomerRepositoryStub()
    const sut = new AddCustomerUseCase(loadCustomerByEmailRepository, addCustomerRepository)
    return {
        sut,
        loadCustomerByEmailRepository,
        addCustomerRepository
    }
}

describe('AddCustomer UseCase', () => {
    it('Should call AddCustomerRepository with correct values', async () => {
        const { sut, addCustomerRepository } = makeSut()

        const addCustomerRepositorySpy = jest.spyOn(addCustomerRepository, 'save')

        const dataCustomer = {
            name: 'any_name',
            email: 'any_email'
        }

        await sut.save(dataCustomer)
        expect(addCustomerRepositorySpy).toHaveBeenCalledWith(dataCustomer)
    })

    it('Should not call AddCustomerRepository if customer with email found', async () => {
        const { sut, addCustomerRepository, loadCustomerByEmailRepository } = makeSut()

        jest.spyOn(loadCustomerByEmailRepository, 'load').mockResolvedValueOnce({
            id: 'other_id',
            name: 'other_name',
            email: 'any_email'
        })

        const addCustomer = jest.spyOn(addCustomerRepository, 'save')

        const dataCustomer = {
            name: 'any_name',
            email: 'any_email'
        }

        await sut.save(dataCustomer)
        expect(addCustomer).not.toHaveBeenCalled()
    })
})