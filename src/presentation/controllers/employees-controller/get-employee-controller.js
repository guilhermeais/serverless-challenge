import { badRequest, ok, serverError } from '../../utils/http-responses.js'
export class GetEmployeeController {
  #getEmployeeUseCase
  #validator

  constructor({ getEmployeeUseCase, validator }) {
    this.#getEmployeeUseCase = getEmployeeUseCase
    this.#validator = validator
  }

  async handle(request) {
    try {
      const error = this.#validator.validate(request)

      if (error) {
        return badRequest(error)
      }

      const employee = await this.#getEmployeeUseCase.execute(request)

      return ok(employee)
    } catch (error) {
      return serverError(error)
    }
  }
}
