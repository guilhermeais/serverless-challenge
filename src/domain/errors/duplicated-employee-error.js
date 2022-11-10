export class DuplicatedEmployeeError extends Error {
  constructor(name) {
    super()
    this.name = 'DuplicatedEmployeeError'
    this.message = `The employee ${name} already exists`
  }
}