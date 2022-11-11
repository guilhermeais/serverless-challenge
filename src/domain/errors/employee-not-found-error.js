class EmployeeNotFoundError extends Error {
  constructor(employee) {
    super()
    this.isDomainError = true
    this.message = `Employee ${employee?.name || ''} with the id ${
      employee.id
    } was not found`
    this.name = 'EmployeeNotFoundError'
  }
}

module.exports = {EmployeeNotFoundError}