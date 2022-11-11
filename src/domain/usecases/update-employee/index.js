const { EmployeeNotFoundError } = require('../../errors/index.js')
const { Employee } = require('../../entities/employee')
class UpdateEmployee {
  #updateEmployeeRepository = null
  #getEmployeeRepository = null

  constructor({ updateEmployeeRepository, getEmployeeRepository }) {
    this.#updateEmployeeRepository = updateEmployeeRepository
    this.#getEmployeeRepository = getEmployeeRepository
  }

  async execute(id, employee) {
    const employeeExists = await this.#getEmployeeRepository.get(id)
    if (!employeeExists) {
      throw new EmployeeNotFoundError(employee)
    }
    const employeeUpdated = await this.#updateEmployeeRepository.update(
      id,
      employee
    )
    return new Employee(employeeUpdated)
  }
}

module.exports = { UpdateEmployee }
