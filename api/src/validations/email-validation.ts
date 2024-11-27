import { MissingParamError } from "@/presentation/errors/missing-param-error"
import { EmailValidator } from "./protocols/email-validator"
import validator from "validator"

export class EmailValidation implements EmailValidator {
  isValid(email: string) {
    if (!email) {
      throw new MissingParamError('email')
    }
    return validator.isEmail(email)
  }
}