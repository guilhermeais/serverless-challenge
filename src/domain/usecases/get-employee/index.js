const { Employee } = require('../../entities/employee');

class GetEmployee {
  #getEmployeeRepository = null

  constructor({ getEmployeeRepository }) {
    this.#getEmployeeRepository = getEmployeeRepository;
  }

  async execute({ id, name, cpf }) {
    const employee = await this.#getEmployeeRepository.get({ id, name, cpf });
    if (Array.isArray(employee)) {
      return employee.map(e => new Employee(e));
    }
    return new Employee(employee);
  }
}

module.exports = {
  GetEmployee,
}