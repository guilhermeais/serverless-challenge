const { faker } = require('@faker-js/faker')
const {
  UpdateEmployeeSpy,
  mockEmployeeInput,
} = require('../../../../tests/mocks/domain/mock-employee')
const {
  ValidatorSpy,
} = require('../../../../tests/mocks/validator/mock-validator')
const { badRequest, ok, serverError } = require('../../utils/http-responses')
const { UpdateEmployeeController } = require('./update-employee-controller')
describe('UpdateEmployeeController', () => {
  function makeSut() {
    const validatorSpy = new ValidatorSpy()
    const updateEmployeeUseCaseSpy = new UpdateEmployeeSpy()
    const sut = new UpdateEmployeeController({
      validator: validatorSpy,
      updateEmployeeUseCase: updateEmployeeUseCaseSpy,
    })
    return { sut, validatorSpy, updateEmployeeUseCaseSpy }
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

    test('should call updateEmployeeUseCase with correct params', async () => {
      const { sut, updateEmployeeUseCaseSpy } = makeSut()
      const request = {
        id: faker.datatype.uuid(),
        ...mockEmployeeInput(),
      }
      await sut.handle(request)
      expect(updateEmployeeUseCaseSpy.params[0]).toEqual(request.id)
      expect(updateEmployeeUseCaseSpy.params[1]).toEqual(request)
    })

    test('should return ok on success', async () => {
      const { sut, updateEmployeeUseCaseSpy } = makeSut()
      const request = {
        id: faker.datatype.uuid(),
        ...mockEmployeeInput(),
      }
      const response = await sut.handle(request)
      expect(response).toEqual(ok(updateEmployeeUseCaseSpy.result))
    })

    test('should return serverError if updateEmployeeUseCase throws', async () => {
      const mockedError = new Error(faker.random.word())
      const { sut, updateEmployeeUseCaseSpy } = makeSut()
      jest
        .spyOn(updateEmployeeUseCaseSpy, 'execute')
        .mockImplementationOnce(() => {
          throw mockedError
        })
      const request = {
        id: faker.datatype.uuid(),
        ...mockEmployeeInput(),
      }
      const response = await sut.handle(request)
      expect(response).toEqual(serverError(mockedError))
    })
  })
})
