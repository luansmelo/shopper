import { HttpClientProtocol } from '../protocols/http-client-protocol'
import { AxiosHttpClient } from './http-client'
import axios from 'axios'

const makeSut = () => {
    const sut = new AxiosHttpClient()
    return {
        sut
    }
}

describe('AxiosHttpClient', () => {
    it('Should call axios with correct parameters', async () => {
        const { sut } = makeSut()

        const mocked = jest.spyOn(axios, 'request').mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    name: 'fake_name'
                }
            })
        )

        const params: HttpClientProtocol.Request = {
            method: 'get',
            url: 'http://localhost/api',
            headers: { Authorization: 'Bearer token' },
            body: {
                name: 'fake_name'
            },
        }

        const response = await sut.request(params)

        expect(mocked).toHaveBeenCalledWith({
            url: params.url,
            method: params.method,
            headers: params.headers,
            data: params.body,
        })

        expect(response.data).toEqual({ name: 'fake_name' })
    })

    it('Should throw an error if axios throws', async () => {
        const { sut } = makeSut()

        jest.spyOn(axios, 'request').mockRejectedValueOnce(new Error(axios.AxiosError.ERR_NETWORK))

        const params: HttpClientProtocol.Request = {
            url: 'https://example.com/api',
            method: 'get',
            headers: { Authorization: 'Bearer token' },
            body: null,
        }

        await expect(sut.request(params)).rejects.toThrow(axios.AxiosError.ERR_NETWORK)
    })
})
