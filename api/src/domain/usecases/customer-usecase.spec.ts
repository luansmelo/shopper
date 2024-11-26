class CustomerUseCase {
    async save(email?: string) {
        if (!email) throw new Error()
    }
}

describe('Customer UseCase', () => {
    it('Should throw if no email is provided', async () => {
        const sut = new CustomerUseCase()
        const promise = sut.save()
        expect(promise).rejects.toThrow()
    })  
})