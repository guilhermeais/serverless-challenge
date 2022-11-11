import { DuplicatedEmployeeError } from '../../errors/index.js'

export class CreateEmployee {
  #createEmployeeRepository = null
  #getEmployeeRepository = null

  constructor({ createEmployeeRepository, getEmployeeRepository }) {
    this.#createEmployeeRepository = createEmployeeRepository
    this.#getEmployeeRepository = getEmployeeRepository
  }

  async execute(employee) {
    const employeeExists = await this.#getEmployeeRepository.get({
      cpf: employee.cpf,
    })

    if (employeeExists) {
      throw new DuplicatedEmployeeError(employeeExists.name)
    }

    const employeeCreated = await this.#createEmployeeRepository.create(employee)
    return employeeCreated
  }
}