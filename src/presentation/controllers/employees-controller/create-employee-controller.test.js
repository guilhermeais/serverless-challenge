const { faker } = require('@faker-js/faker')
const {
  CreateEmployeeSpy,
  mockEmployeeInput,
} = require('../../../../tests/mocks/domain/mock-employee')
const {
  ValidatorSpy,
} = require('../../../../tests/mocks/validator/mock-validator')
const { badRequest, ok, serverError } = require('../../utils/http-responses')
const { CreateEmployeeController } = require('./create-employee-controller')
describe('CreateEmployeeController', () => {
  function makeSut() {
    const validatorSpy = new ValidatorSpy()
    const createEmployeeUseCaseSpy = new CreateEmployeeSpy()
    const sut = new CreateEmployeeController({
      validator: validatorSpy,
      createEmployeeUseCase: createEmployeeUseCaseSpy,
    })
    return { sut, validatorSpy, createEmployeeUseCaseSpy }
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

    test('should call createEmployeeUseCase with correct params', async () => {
      const { sut, createEmployeeUseCaseSpy } = makeSut()
      const request = mockEmployeeInput()
      await sut.handle(request)
      expect(createEmployeeUseCaseSpy.params).toEqual(request)
    })

    test('should return serverError if createEmployeeUseCase throws', async () => {
      const mockedError = new Error()
      const { sut, createEmployeeUseCaseSpy } = makeSut()
      jest.spyOn(createEmployeeUseCaseSpy, 'execute').mockImplementationOnce(() => {
        throw mockedError
      })
      const request = mockEmployeeInput()
      const response = await sut.handle(request)
      expect(response).toEqual(serverError(mockedError))
    })

    test('should return ok if createEmployeeUseCase succeeds', async () => {
      const { sut, createEmployeeUseCaseSpy } = makeSut()
      const request = mockEmployeeInput()
      const response = await sut.handle(request)
      expect(response).toEqual(ok(createEmployeeUseCaseSpy.result))
    })
  })
})
