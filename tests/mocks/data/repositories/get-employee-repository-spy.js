import { mockEmployee } from '../../domain/mock-employee'

export class GetEmployeeRepositorySpy {
  params = null
  result = [mockEmployee()]
  async get(...params) {
    this.params = params
    return this.result
  }
}
