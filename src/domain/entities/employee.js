class Employee {
  constructor({id, name, age, salary, cpf, role, createdAt, updatedAt}) {
    this.id = id
    this.name = name
    this.age = age
    this.salary = salary
    this.cpf = cpf
    this.role = role
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

module.exports = { Employee }