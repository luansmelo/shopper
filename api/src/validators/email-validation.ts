import { Validation } from "@/presentation/protocols/validation.protocol"
import { EmailValidator } from "./protocols/email-validator"
import { InvalidParamError } from "@/utils/errors/invalid-param-error"

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | void {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
