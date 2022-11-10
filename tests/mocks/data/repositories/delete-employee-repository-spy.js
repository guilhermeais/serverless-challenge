export class DeleteEmployeeRepositorySpy {
  params = null
  async delete(...params) {
    this.params = params
  }
}