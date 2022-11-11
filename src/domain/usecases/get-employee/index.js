class GetEmployee {
  #getEmployeeRepository = null

  constructor({ getEmployeeRepository }) {
    this.#getEmployeeRepository = getEmployeeRepository;
  }

  async execute({ id, name, cpf }) {
    const employee = await this.#getEmployeeRepository.get({ id, name, cpf });
    return employee;
  }
}

module.exports = {
  GetEmployee,
}