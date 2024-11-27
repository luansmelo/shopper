import { AddCustomerUseCase } from "@/data/usecases/add-customer-usecase";
import { CustomerRepository } from "@/infra/db/repositories/customer.repository";
import { AddCustomerController } from "@/presentation/controllers/add-customer.controller";
import { EmailValidation } from "@/validations/email-validation";

export const makeAddCustomerController = (): AddCustomerController => {
    const repository = new CustomerRepository()
    const useCase = new AddCustomerUseCase(repository, repository)
    const emailValidator = new EmailValidation()
    return new AddCustomerController(useCase, emailValidator)
}