const  { badRequest, ok, serverError }  = require('../../utils/http-responses')
class UpdateEmployeeController {
  #updateEmployeeUseCase
  #validator

  constructor({ updateEmployeeUseCase, validator }) {
    this.#updateEmployeeUseCase = updateEmployeeUseCase
    this.#validator = validator
  }

  async handle(request) {
    try {
      const error = this.#validator.validate(request)

      if (error) {
        return badRequest(error)
      }

      const employeeUpdated = await this.#updateEmployeeUseCase.execute(request.id, request)

      return ok(employeeUpdated)
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = {
  UpdateEmployeeController,
}