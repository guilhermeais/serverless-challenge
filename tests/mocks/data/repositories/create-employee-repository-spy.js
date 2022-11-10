import { mockEmployee } from '../../domain/mock-employee'
export class CreateEmployeeRepositorySpy {
  params = null
  result = mockEmployee()
  async create(...params) {
    this.params = params
    return this.result
  }
}