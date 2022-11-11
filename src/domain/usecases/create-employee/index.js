const { DuplicatedEmployeeError } = require('../../errors/index.js')

class CreateEmployee {
  #createEmployeeRepository = null
  #getEmployeeRepository = null
  #uuidGenerator = null

  constructor({ createEmployeeRepository, getEmployeeRepository, uuidGenerator }) {
    this.#createEmployeeRepository = createEmployeeRepository
    this.#getEmployeeRepository = getEmployeeRepository
    this.#uuidGenerator = uuidGenerator
  }

  async execute(employee) {
    const employeeExists = await this.#getEmployeeRepository.get({
      cpf: employee.cpf,
    })

    if (employeeExists) {
      throw new DuplicatedEmployeeError(employeeExists.name)
    }

    const employeeWithId = {
      ...employee,
      id: this.#uuidGenerator.generate(),
    }
    const employeeCreated = await this.#createEmployeeRepository.create(
      employeeWithId
    )
    return employeeCreated
  }
}
module.exports = { CreateEmployee }
