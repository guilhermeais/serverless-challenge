const { faker } = require('@faker-js/faker')
const {
  DeleteEmployeeSpy,
  mockEmployeeInput,
} = require('../../../../tests/mocks/domain/mock-employee')
const {
  ValidatorSpy,
} = require('../../../../tests/mocks/validator/mock-validator')
const {
  badRequest,
  ok,
  serverError,
  noContent,
} = require('../../utils/http-responses')
const { DeleteEmployeeController } = require('./delete-employee-controller')
describe('DeleteEmployeeController', () => {
  function makeSut() {
    const validatorSpy = new ValidatorSpy()
    const deleteEmployeeUseCaseSpy = new DeleteEmployeeSpy()
    const sut = new Delete({
      validator: validatorSpy,
      deleteEmployeeUseCase: deleteEmployeeUseCaseSpy,
    })
    return { sut, validatorSpy, deleteEmployeeUseCaseSpy }
  }
  describe('handle()', () => {
    test('should call validator with correct params', async () => {
      const { sut, validatorSpy } = makeSut()
      const request = mockEmployeeInput()
      await sut.handle(request)
      expect(validatorSpy.params).toEqual(request)
    })

    test('should return badRequest if validator returns an error', async () => {
      const { sut, validatorSpy } = makeSut()
      validatorSpy.error = faker.random.word()
      const request = mockEmployeeInput()
      const response = await sut.handle(request)
      expect(response).toEqual(badRequest(validatorSpy.error))
    })

    test('should call deleteEmployeeUseCase with correct params', async () => {
      const { sut, deleteEmployeeUseCaseSpy } = makeSut()
      const request = mockEmployeeInput()
      await sut.handle(request)
      expect(deleteEmployeeUseCaseSpy.params).toEqual(request)
    })

    test('should return noContent on success', async () => {
      const { sut } = makeSut()
      const request = mockEmployeeInput()
      const response = await sut.handle(request)
      expect(response).toEqual(noContent())
    })

    test('should return serverError if deleteEmployeeUseCase throws', async () => {
      const { sut, deleteEmployeeUseCaseSpy } = makeSut()
      jest.spyOn(deleteEmployeeUseCaseSpy, 'execute').mockImplementationOnce(() => {
        throw new Error()
      })
      const request = mockEmployeeInput()
      const response = await sut.handle(request)
      expect(response).toEqual(serverError(new Error()))
    })
  })
})
