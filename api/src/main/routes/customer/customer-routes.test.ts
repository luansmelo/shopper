import request from 'supertest'
import app from '../../config/app'
import { sequelize } from '@/config/database.config'
import { CustomerModel } from '@/infra/db/models/customer'

describe('Customer Routes', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    beforeEach(async () => {
        await CustomerModel.truncate()
    })

    describe('POST /api/customers', () => {
        it('Should return 200 on success create a customer', async () => {
            await request(app)
                .post('/api/customers')
                .send({
                    name: 'any_name',
                    email: 'any_email@hotmail.com'
                }).expect(200)
        })

        it('Should return 400 if email is invalid', async () => {
            await request(app)
                .post('/api/customers')
                .send({
                    name: 'any_name',
                    email: 'invalid_email'
                }).expect(400)
        })
    })
})