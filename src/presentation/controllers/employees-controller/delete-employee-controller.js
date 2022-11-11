const  { badRequest, noContent, serverError }  = require('../../utils/http-responses')
class DeleteEmployeeController {
  #deleteEmployeeUseCase
  #validator

  constructor({ deleteEmployeeUseCase, validator }) {
    this.#deleteEmployeeUseCase = deleteEmployeeUseCase
    this.#validator = validator
  }

  async handle(request) {
    try {
      const error = this.#validator.validate(request)

      if (error) {
        return badRequest(error)
      }

      await this.#deleteEmployeeUseCase.execute(request)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = {
  DeleteEmployeeController,
}