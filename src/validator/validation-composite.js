import { Validation } from './base/validation';

export class ValidationComposite extends Validation {
  #validators;

  constructor(validators) {
    super();
    this.#validators = validators;
  }

  validate(input) {
    for (const validator of this.#validators) {
      const error = validator.validate(input);
      if (error) {
        return error;
      }
    }
  }
}