import { Sequelize } from "sequelize-typescript";
import { DriverRepository } from "./driver.repository";
import { DriverModel } from "../models/driver";

const makeSut = () => {
    const sut = new DriverRepository()
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
            models: [DriverModel],
        })

        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    beforeEach(async () => {
        await DriverModel.truncate()
    })

    it('Should load all drivers on success', async () => {
        const driverData = [
            {
                id: 'driver_1',
                name: 'Homer Simpson',
                description: `Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).`,
                car: 'Plymouth Valiant 1973 rosa e enferrujado',
                rating: '2/5',
                comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
                rate_per_km: 2.50,
                min_km: 1
            },
            {
                id: 'driver_2',
                name: 'Dominic Toretto',
                description: `Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.`,
                car: 'Dodge Charger R/T 1970 modificado',
                rating: '4/5',
                comment: `Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!`,
                rate_per_km: 5.00,
                min_km: 5
            },
            {
                id: 'driver_3',
                name: 'James Bond',
                description: `Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.`,
                car: 'Aston Martin DB5 clássico',
                rating: '5/5',
                comment: `Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.`,
                rate_per_km: 10.00,
                min_km: 10
            }
        ]

        for (const driver of driverData) {
            await DriverModel.create(driver)
        }

        const { sut } = makeSut()

        const drivers = await sut.load()

        expect(drivers).not.toBeNull()
        expect(drivers.length).toBe(driverData.length)

        drivers.forEach((driver, index) => {
            expect(driver.id).toBe(driverData[index].id)
            expect(driver.name).toBe(driverData[index].name)
            expect(driver.description).toBe(driverData[index].description)
            expect(driver.car).toBe(driverData[index].car)
            expect(driver.rating).toBe(driverData[index].rating)
            expect(driver.comment).toBe(driverData[index].comment)
            expect(driver.rate_per_km).toBe(driverData[index].rate_per_km)
            expect(driver.min_km).toBe(driverData[index].min_km)
        })
    })

    test('Should load empty list', async () => {
        const { sut } = makeSut()
        const drivers = await sut.load()
        expect(drivers.length).toBe(0)
    })
})
