import { LoadCustomerRepository } from "./customer.repository";
import { CustomerModel } from "./models/customer";
import { Sequelize } from "sequelize-typescript";

const makeSut = () => {
    const sut = new LoadCustomerRepository()
    return {
        sut
    }
}

describe('LoadByCustomerEmail Repository', () => {
    let sequelize: Sequelize

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            models: [CustomerModel],
        })

        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    beforeEach(async () => {
        await CustomerModel.truncate()
    })

    it('Should return a customer if customer is found', async () => {
        const customerData = {
            email: 'test@example.com',
            name: 'Test Customer'
        }

        await CustomerModel.create(customerData)

        const { sut } = makeSut()

        const customer = await sut.load(customerData.email)

        expect(customer).not.toBeNull()
        expect(customer?.email).toBe(customerData.email)
        expect(customer?.name).toBe(customerData.name)
    })

    it('Should return null if customer is not found', async () => {
        const email = 'fake@example.com'
        const { sut } = makeSut()

        const customer = await sut.load(email)
        expect(customer).toBeNull()
    })

    it('Should return a customer on success create', async () => {
        const { sut } = makeSut()
        const customerParams = {
            name: 'any_name',
            email: 'any_email'
        }

        const customer = await sut.save(customerParams)
        expect(customer).toBeTruthy()
        expect(customer.id).toBeTruthy()
        expect(customer.name).toBe(customerParams.name)
        expect(customer.email).toBe(customerParams.email)
    })
})