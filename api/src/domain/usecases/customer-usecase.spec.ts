class CustomerUseCase {
    async save(email?: string, name?: string) {
        if (!email) throw new Error()
        if (!name) throw new Error()
    }
}

describe('Customer UseCase', () => {
    it('Should throw if no email is provided', async () => {
        const sut = new CustomerUseCase()
        const promise = sut.save()
        expect(promise).rejects.toThrow()
    })

    it('Should throw if no name is provided', async () => {
        const sut = new CustomerUseCase()
        const promise = sut.save('email@mail.com')
        expect(promise).rejects.toThrow()
    })
})