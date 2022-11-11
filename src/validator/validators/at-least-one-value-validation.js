const { MissingParamError } = require('../../presentation/errors/missing-param-error');
const { Validation } = require('../base/validation');

class AtLestOneValueValidation extends Validation {
  constructor(fields) {
    super();
    this.fields = fields;
  }

  validate(input) {
    for (const field of this.fields) {
      if (input[field]) {
        return null;
      }
    }
    return new MissingParamError(this.fields, 'At least one value must be provided');
  }
}

module.exports = {
  AtLestOneValueValidation,
};