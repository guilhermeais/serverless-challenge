import { Validation} from '../../../src/validator/base/validation'
export class ValidatorSpy extends Validation {
  error = null
  params = null

  validate (params) {
    this.params = params
    return this.error
  }
}