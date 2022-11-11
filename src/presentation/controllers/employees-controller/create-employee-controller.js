const  { badRequest, ok, serverError }  = require('../../utils/http-responses')
class CreateEmployeeController {
  #createEmployeeUseCase
  #validator

  constructor({ createEmployeeUseCase, validator }) {
    this.#createEmployeeUseCase = createEmployeeUseCase
    this.#validator = validator
  }

  async handle(request) {
    try {
      const error = this.#validator.validate(request)

      if (error) {
        return badRequest(error)
      }

      const employee = await this.#createEmployeeUseCase.execute(request)

      return ok(employee)
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = {
  CreateEmployeeController,
}