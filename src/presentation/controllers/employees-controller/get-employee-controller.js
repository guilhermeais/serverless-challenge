const  { badRequest, ok, serverError }  = require('../../utils/http-responses')
class GetEmployeeController {
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

module.exports = {
  GetEmployeeController,
}