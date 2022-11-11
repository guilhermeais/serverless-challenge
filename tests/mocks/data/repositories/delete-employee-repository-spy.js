class DeleteEmployeeRepositorySpy {
  params = null
  async delete(...params) {
    this.params = params
  }
}

module.exports = { DeleteEmployeeRepositorySpy }
