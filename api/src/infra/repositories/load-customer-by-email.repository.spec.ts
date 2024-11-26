import { Customer, LoadCustomerByEmailRepositoryContract } from "@/domain/repositories/load-customer-by-email.repository";
import { CustomerModel } from "./models/customer";
import { Sequelize } from "sequelize-typescript";

class LoadCustomerByEmailRepository implements LoadCustomerByEmailRepositoryContract {
    async load(email: string): Promise<Customer.Result | null> {
        const customer = await CustomerModel.findOne({ where: { email } })
        if (!customer) return null
        return customer.get({ plain: true })
    }
}

const makeSut = () => {
    const sut = new LoadCustomerByEmailRepository()
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

    it('Should return an customer if customer is found', async () => {
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
})