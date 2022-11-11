import { EmployeeNotFoundError } from '../../errors/index.js';

export class UpdateEmployee {
  #updateEmployeeRepository = null
  #getEmployeeRepository = null

  constructor({updateEmployeeRepository, getEmployeeRepository}) {
    this.#updateEmployeeRepository = updateEmployeeRepository;
    this.#getEmployeeRepository = getEmployeeRepository;
  }

  async execute(id, employee) {
    const employeeExists = await this.#getEmployeeRepository.get(id);
    if (!employeeExists) {
      throw new EmployeeNotFoundError(employee);
    }
    return this.#updateEmployeeRepository.update(id, employee);
  }
}