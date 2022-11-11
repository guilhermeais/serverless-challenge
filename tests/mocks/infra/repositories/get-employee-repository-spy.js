const { mockEmployee } = require('../../domain/mock-employee')

class GetEmployeeRepositorySpy {
  params = null
  result = [mockEmployee()]
  async get(...params) {
    this.params = params
    return this.result
  }
}

module.exports = { GetEmployeeRepositorySpy }
