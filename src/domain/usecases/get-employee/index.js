export class GetEmployee {
  #getEmployeeRepository = null

  constructor({ getEmployeeRepository }) {
    this.#getEmployeeRepository = getEmployeeRepository;
  }

  async execute({ id, name }) {
    const employee = await this.#getEmployeeRepository.get({ id, name });
    return employee;
  }
}