const  { mockEmployee }  = require('../../domain/mock-employee')
class UpdateEmployeeRepositorySpy {
  params = null
  result = mockEmployee()
  async update(...params) {
    this.params = params
    return this.result
  }
}

module.exports = {UpdateEmployeeRepositorySpy}