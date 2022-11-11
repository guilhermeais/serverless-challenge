const { faker } = require('@faker-js/faker')
const {
  GetEmployeeSpy,
} = require('../../../../tests/mocks/domain/mock-employee')
const {
  ValidatorSpy,
} = require('../../../../tests/mocks/validator/mock-validator')
const { badRequest, ok, serverError } = require('../../utils/http-responses')
const { GetEmployeeController } = require('./get-employee-controller')
describe('GetEmployeeController', () => {
  function makeSut() {
    const validatorSpy = new ValidatorSpy()
    const getEmployeeUseCaseSpy = new GetEmployeeSpy()
    const sut = new GetEmployeeController({
      validator: validatorSpy,
      getEmployeeUseCase: getEmployeeUseCaseSpy,
    })
    return { sut, validatorSpy, getEmployeeUseCaseSpy }
  }
  describe('handle()', () => {
    test('should call validator with correct params', async () => {
      const { sut, validatorSpy } = makeSut()
      const request = {
        id: faker.datatype.uuid(),
      }
      await sut.handle(request)
      expect(validatorSpy.params).toEqual(request)
    })

    test('should return badRequest if validator returns an error', async () => {
      const { sut, validatorSpy } = makeSut()
      const mockedError = new Error()
      validatorSpy.error = mockedError
      const response = await sut.handle({})
      expect(response).toEqual(badRequest(mockedError))
    })

    test('should call getEmployeeUseCase with correct params', async () => {
      const { sut, getEmployeeUseCaseSpy } = makeSut()
      const request = {
        id: faker.datatype.uuid(),
      }
      await sut.handle(request)
      expect(getEmployeeUseCaseSpy.params).toEqual(request)
    })

    test('should return 200 with getEmployeeUseCase result', async () => {
      const { sut, getEmployeeUseCaseSpy } = makeSut()
      const response = await sut.handle({})
      expect(response).toEqual(ok(getEmployeeUseCaseSpy.result))
    })

    test('should return serverError if getEmployeeUseCase throws', async () => {
      const { sut, getEmployeeUseCaseSpy } = makeSut()
      const mockedError = new Error()
      jest
        .spyOn(getEmployeeUseCaseSpy, 'execute')
        .mockImplementationOnce(() => {
          throw mockedError
        })
      const response = await sut.handle({})
      expect(response).toEqual(serverError(mockedError))
    })
  })
})
