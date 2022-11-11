const { CreateEmployee } = require('.')
const {
  CreateEmployeeRepositorySpy,
} = require('../../../../tests/mocks/data/repositories/create-employee-repository-spy')
const {
  GetEmployeeRepositorySpy,
} = require('../../../../tests/mocks/data/repositories/get-employee-repository-spy')
const {
  mockEmployee,
  mockEmployeeInput,
} = require('../../../../tests/mocks/domain/mock-employee')
const { DuplicatedEmployeeError } = require('../../errors')

describe('CreateEmployee', () => {
  function makeSut() {
    const getEmployeeRepositorySpy = new GetEmployeeRepositorySpy()
    getEmployeeRepositorySpy.result = null
    const createEmployeeRepositorySpy = new CreateEmployeeRepositorySpy()
    const sut = new CreateEmployee({
      getEmployeeRepository: getEmployeeRepositorySpy,
      createEmployeeRepository: createEmployeeRepositorySpy,
    })

    return {
      sut,
      getEmployeeRepositorySpy,
      createEmployeeRepositorySpy,
    }
  }
  describe('execute()', () => {
    test('should call getEmployeeRepository with correct params', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const employee = mockEmployeeInput()
      await sut.execute(employee)
      expect(getEmployeeRepositorySpy.params[0]).toEqual({
        cpf: employee.cpf,
      })
    })

    test('should throw DuplicatedEmployeeError if employee already exists', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const mockedEmployeeResult = mockEmployee()
      getEmployeeRepositorySpy.result = mockedEmployeeResult
      const employee = mockEmployeeInput()
      const promise = sut.execute(employee)
      await expect(promise).rejects.toThrow(
        new DuplicatedEmployeeError(mockedEmployeeResult.name)
      )
    })

    test('should throw if getEmployeeRepository throws', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const mockedError = new Error('some_error')
      jest
        .spyOn(getEmployeeRepositorySpy, 'get')
        .mockRejectedValueOnce(mockedError)
      const employee = mockEmployeeInput()
      const promise = sut.execute(employee)
      await expect(promise).rejects.toThrow(mockedError)
    })

    test('should call createEmployeeRepository with correct params', async () => {
      const { sut, createEmployeeRepositorySpy } = makeSut()
      const employee = mockEmployeeInput()
      await sut.execute(employee)
      expect(createEmployeeRepositorySpy.params[0]).toEqual(employee)
    })

    test('should return createEmployeeRepository result', async () => {
      const { sut, createEmployeeRepositorySpy } = makeSut()
      const employee = mockEmployeeInput()
      const result = await sut.execute(employee)
      expect(result).toEqual(createEmployeeRepositorySpy.result)
    })

    test('should throw if createEmployeeRepository throws', async () => {
      const { sut, createEmployeeRepositorySpy } = makeSut()
      const mockedError = new Error('some_error')
      jest
        .spyOn(createEmployeeRepositorySpy, 'create')
        .mockRejectedValueOnce(mockedError)
      const employee = mockEmployeeInput()
      const promise = sut.execute(employee)
      await expect(promise).rejects.toThrow(mockedError)
    })
  })
})
