class MissingParamError extends Error {
  constructor(paramName, details = '') {
    super();
    this.name = 'MissingParamError';
    this.message = `Missing param: ${paramName}${details? `. ${details}`: ''}`;
  }
}

module.exports = {
  MissingParamError,
};