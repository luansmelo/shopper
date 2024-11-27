
import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
    it('Should enable CORS', async () => {
        app.get('/test_cors', (req, res) => {
            res.send('')
        })

        await request(app)
            .get('/test_cors')
            .expect('access-control-allow-origin', '*')
            .expect('access-control-allow-methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            .expect('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept')
    })
})
