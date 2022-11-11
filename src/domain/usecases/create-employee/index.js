const { DuplicatedEmployeeError } = require('../../errors/index.js')
const { Employee } = require('../../entities/employee')
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

    if (employeeExists?.length > 0) {
      throw new DuplicatedEmployeeError(employeeExists[0].name)
    }

    const employeeWithId = {
      ...employee,
      id: this.#uuidGenerator.generate(),
    }
    const employeeCreated = await this.#createEmployeeRepository.create(
      employeeWithId
    )
    return new Employee(employeeCreated)
  }
}
module.exports = { CreateEmployee }
