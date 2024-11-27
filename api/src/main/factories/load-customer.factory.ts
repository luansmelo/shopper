import { LoadCustomerByEmailUseCase } from "@/data/usecases/load-customer-by-email-usecase";
import { CustomerRepository } from "@/infra/db/repositories/customer.repository";
import { LoadCustomerByEmailController } from "@/presentation/controllers/load-customer-by-email.controller";
import { EmailValidation } from "@/validations/email-validation";

export const makeLoadCustomerByEmailController = (): LoadCustomerByEmailController => {
    const repository = new CustomerRepository()
    const useCase = new LoadCustomerByEmailUseCase(repository)
    const emailValidator = new EmailValidation()
    return new LoadCustomerByEmailController(useCase, emailValidator)
}