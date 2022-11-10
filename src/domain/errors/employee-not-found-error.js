export class EmployeeNotFoundError extends Error {
  constructor(employee) {
    super();
    this.message = `Employee ${employee.name} with the id ${employee.id} was not found`;
    this.name = 'EmployeeNotFoundError';
  }
}