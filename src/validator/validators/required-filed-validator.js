const  { MissingParamError }  = require('../../presentation/errors/missing-param-error')

class RequiredFieldValidation extends Validation {
  #fieldName = ''
  constructor (fieldName) {
    super()
    this.#fieldName = fieldName
  }

  validate (input) {
    if (!input[this.#fieldName]) {
      return new MissingParamError(this.#fieldName)
    }
  }
}

module.exports = {
  RequiredFieldValidation,
}