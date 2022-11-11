const  { Validation }  = require('./base/validation.js');

class ValidationComposite extends Validation {
  #validators;

  constructor(...validators) {
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

module.exports = {
  ValidationComposite,
};