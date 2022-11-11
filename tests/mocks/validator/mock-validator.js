const  { Validation}  = require('../../../src/validator/base/validation')
class ValidatorSpy extends Validation {
  error = null
  params = null
  
  validate (params) {
    this.params = params
    return this.error
  }
}
module.exports = {ValidatorSpy}