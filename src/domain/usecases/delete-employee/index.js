import { EmployeeNotFoundError } from '../../errors/index.js';

export class DeleteEmployee {
  #deleteEmployeeRepository;
  #getEmployeeRepository;
  constructor({
    getEmployeeRepository,
    deleteEmployeeRepository
  }) {
    this.#getEmployeeRepository = getEmployeeRepository;
    this.#deleteEmployeeRepository = deleteEmployeeRepository;
  }

  async execute(id) {
    const employee = await this.#getEmployeeRepository.get(id);
    if (!employee) {
      throw new EmployeeNotFoundError({id});
    }
    await this.#deleteEmployeeRepository.delete(id);
  }
}