const { faker } = require('@faker-js/faker')
function mockEmployee() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    role: faker.name.jobTitle(),
    salary: faker.datatype.number(),
    age: faker.datatype.number(),
    cpf: faker.random.numeric(11),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
}
function mockEmployeeInput() {
  return {
    name: faker.name.firstName(),
    role: faker.name.jobTitle(),
    salary: faker.datatype.number(),
    age: faker.datatype.number(),
    cpf: faker.random.numeric(11),
  }
}

class GetEmployeeSpy {
  result = mockEmployee()
  params = null
  async execute(params) {
    this.params = params
    return Promise.resolve(this.result)
  }
}

module.exports = { GetEmployeeSpy, mockEmployee, mockEmployeeInput }
