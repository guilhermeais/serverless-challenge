class DuplicatedEmployeeError extends Error {
  constructor(name) {
    super()
    this.isDomainError = true
    this.name = 'DuplicatedEmployeeError'
    this.message = `The employee ${name||''} already exists`
  }
}

module.exports = { DuplicatedEmployeeError }
