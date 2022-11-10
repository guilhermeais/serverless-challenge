import { mockEmployee } from '../../domain/mock-employee'
export class UpdateEmployeeRepositorySpy {
  params = null
  result = mockEmployee()
  async update(...params) {
    this.params = params
    return this.result
  }
}