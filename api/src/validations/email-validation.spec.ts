import validator from "validator"
import { EmailValidator } from "./protocols/email-validator"

class EmailValidation implements EmailValidator {
    email!: string
    isValid(email: string): boolean {
        this.email = email
        return validator.isEmail(email)
    }
}

const makeSut = () => {
    return new EmailValidation()
}

describe('Email Validator', () => {
    it('Should return true if validator returns true', () => {
        const sut = makeSut()
        const isMailValid = sut.isValid('valid@mail.com')
        expect(isMailValid).toBe(true)
    })

    it('Should return false if validator returns false', () => {
        const sut = makeSut()

        const isMailValid = sut.isValid('invalid@mail')
        expect(isMailValid).toBe(false)
    })

    it('Should call validator with correct email', () => {
        const sut = makeSut()

        sut.isValid('valid@mail.com')
        expect(sut.email).toBe('valid@mail.com')
    })
})