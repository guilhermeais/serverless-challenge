const  { mockEmployee }  = require('../../domain/mock-employee')
class CreateEmployeeRepositorySpy {
  params = null
  result = mockEmployee()
  async create(...params) {
    this.params = params
    return this.result
  }
}
module.exports = {CreateEmployeeRepositorySpy}