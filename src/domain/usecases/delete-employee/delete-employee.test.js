const { DeleteEmployee } = require('.')
const {
  GetEmployeeRepositorySpy,
} = require('../../../../tests/mocks/infra/repositories/get-employee-repository-spy')
const {
  DeleteEmployeeRepositorySpy,
} = require('../../../../tests/mocks/infra/repositories/delete-employee-repository-spy')
const { faker } = require('@faker-js/faker')
const { EmployeeNotFoundError } = require('../../errors')

describe('DeleteEmployee', () => {
  function makeSut() {
    const getEmployeeRepositorySpy = new GetEmployeeRepositorySpy()
    const deleteEmployeeRepositorySpy = new DeleteEmployeeRepositorySpy()
    const sut = new DeleteEmployee({
      getEmployeeRepository: getEmployeeRepositorySpy,
      deleteEmployeeRepository: deleteEmployeeRepositorySpy,
    })

    return {
      sut,
      getEmployeeRepositorySpy,
      deleteEmployeeRepositorySpy,
    }
  }
  describe('execute()', () => {
    test('should call getEmployeeRepository with correct params', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const id = faker.datatype.uuid()
      await sut.execute(id)
      expect(getEmployeeRepositorySpy.params[0]).toEqual(id)
    })

    test('should throw EmployeeNotFoundError if getEmployeeRepository returns null', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      getEmployeeRepositorySpy.result = null
      const id = faker.datatype.uuid()
      const promise = sut.execute(id)
      await expect(promise).rejects.toThrow(new EmployeeNotFoundError({ id }))
    })

    test('should throw if getEmployeeRepository throw', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const mockedError = new Error()
      jest
        .spyOn(getEmployeeRepositorySpy, 'get')
        .mockRejectedValueOnce(mockedError)
      const id = faker.datatype.uuid()
      const promise = sut.execute(id)
      await expect(promise).rejects.toThrow(mockedError)
    })

    test('should call deleteEmployeeRepository with correct params', async () => {
      const { sut, deleteEmployeeRepositorySpy } = makeSut()
      const id = faker.datatype.uuid()
      await sut.execute(id)
      expect(deleteEmployeeRepositorySpy.params[0]).toEqual(id)
    })

    test('should throw if deleteEmployeeRepository throw', async () => {
      const { sut, deleteEmployeeRepositorySpy } = makeSut()
      const mockedError = new Error()
      jest
        .spyOn(deleteEmployeeRepositorySpy, 'delete')
        .mockRejectedValueOnce(mockedError)
      const id = faker.datatype.uuid()
      const promise = sut.execute(id)
      await expect(promise).rejects.toThrow(mockedError)
    })
  })
})
