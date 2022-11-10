import { faker } from '@faker-js/faker'
export function mockEmployee() {
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

export function mockEmployeeInput() {
  return {
    name: faker.name.firstName(),
    role: faker.name.jobTitle(),
    salary: faker.datatype.number(),
    age: faker.datatype.number(),
    cpf: faker.random.numeric(11),
  }
}
