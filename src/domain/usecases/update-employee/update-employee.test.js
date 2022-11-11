const { faker } = require('@faker-js/faker')
const { UpdateEmployee } = require('.')
const {
  GetEmployeeRepositorySpy,
} = require('../../../../tests/mocks/infra/repositories/get-employee-repository-spy')
const {
  UpdateEmployeeRepositorySpy,
} = require('../../../../tests/mocks/infra/repositories/update-employee-repository-spy')
const { mockEmployee } = require('../../../../tests/mocks/domain/mock-employee')
const { EmployeeNotFoundError } = require('../../errors')

describe('UpdateEmployee', () => {
  function makeSut() {
    const getEmployeeRepositorySpy = new GetEmployeeRepositorySpy()
    const updateEmployeeRepositorySpy = new UpdateEmployeeRepositorySpy()
    const sut = new UpdateEmployee({
      getEmployeeRepository: getEmployeeRepositorySpy,
      updateEmployeeRepository: updateEmployeeRepositorySpy,
    })

    return {
      sut,
      getEmployeeRepositorySpy,
      updateEmployeeRepositorySpy,
    }
  }
  describe('execute()', () => {
    test('should call getEmployeeRepository with correct params', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const employee = mockEmployee()
      const id = faker.datatype.uuid()
      await sut.execute(id, employee)
      expect(getEmployeeRepositorySpy.params[0]).toEqual(id)
    })

    test('should throw EmployeeNotFoundError if the getEmployeeReposotiry returns null', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      getEmployeeRepositorySpy.result = null
      const employee = mockEmployee()
      const id = faker.datatype.uuid()
      const promise = sut.execute(id, employee)
      await expect(promise).rejects.toThrow(new EmployeeNotFoundError(employee))
    })

    test('should throw if getEmployeeRepository throws', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      jest.spyOn(getEmployeeRepositorySpy, 'get').mockImplementationOnce(() => {
        throw new Error()
      })
      const employee = mockEmployee()
      const id = faker.datatype.uuid()
      const promise = sut.execute(id, employee)
      await expect(promise).rejects.toThrow()
    })

    test('should call updateEmployeeRepository with correct params', async () => {
      const { sut, updateEmployeeRepositorySpy } = makeSut()
      const employee = mockEmployee()
      const id = faker.datatype.uuid()
      await sut.execute(id, employee)
      expect(updateEmployeeRepositorySpy.params[0]).toEqual(id)
      expect(updateEmployeeRepositorySpy.params[1]).toEqual(employee)
    })

    test('should return updateEmployeeRepository result', async () => {
      const { sut, updateEmployeeRepositorySpy } = makeSut()
      const employee = mockEmployee()
      const id = faker.datatype.uuid()
      const result = await sut.execute(id, employee)
      expect(result).toEqual(updateEmployeeRepositorySpy.result)
    })

    test('should throw if updateEmployeeRepository throws', async () => {
      const { sut, updateEmployeeRepositorySpy } = makeSut()
      const mockedError = new Error()
      jest
        .spyOn(updateEmployeeRepositorySpy, 'update')
        .mockImplementationOnce(() => {
          throw mockedError
        })
      const employee = mockEmployee()
      const id = faker.datatype.uuid()
      const promise = sut.execute(id, employee)
      await expect(promise).rejects.toThrow(mockedError)
    })
  })
})
