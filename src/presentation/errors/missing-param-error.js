class MissingParamError extends Error {
  constructor(paramName, details = '') {
    super(`Missing param: ${paramName}`+details?`. ${details}`:'');
    this.name = 'MissingParamError';
  }
}

module.exports = {
  MissingParamError,
};