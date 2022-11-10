import { faker } from '@faker-js/faker';
import { describe, expect, test, jest } from '@jest/globals'
import { GetEmployeeSpy } from '../../../../tests/mocks/domain/mock-employee';
import { ValidatorSpy } from '../../../../tests/mocks/validator/mock-validator';
import { badRequest, ok, serverError } from '../../utils/http-responses';
import { GetEmployeeController } from './get-employee-controller';
describe('GetEmployeeController', () => {
  function makeSut() {
    const validatorSpy = new ValidatorSpy()
    const getEmployeeUseCaseSpy = new GetEmployeeSpy()
    const sut = new GetEmployeeController({
      validator: validatorSpy,
      getEmployeeUseCase: getEmployeeUseCaseSpy
    })
    return { sut, validatorSpy, getEmployeeUseCaseSpy }
  }
  describe('handle()', () => {
    test('should call validator with correct params', async () => {
      const { sut, validatorSpy } = makeSut()
      const request = {
        id: faker.datatype.uuid()
      }
      await sut.handle(request)
      expect(validatorSpy.params).toEqual(request)
    });

    test('should return badRequest if validator returns an error', async () => {
      const { sut, validatorSpy } = makeSut()
      const mockedError = new Error()
      validatorSpy.error = mockedError
      const response = await sut.handle({})
      expect(response).toEqual(badRequest(mockedError))
    });

    test('should call getEmployeeUseCase with correct params', async () => {
      const { sut, getEmployeeUseCaseSpy } = makeSut()
      const request = {
        id: faker.datatype.uuid()
      }
      await sut.handle(request)
      expect(getEmployeeUseCaseSpy.params).toEqual(request)
    });

    test('should return 200 with getEmployeeUseCase result', async () => {
      const { sut, getEmployeeUseCaseSpy } = makeSut()
      const response = await sut.handle({})
      expect(response).toEqual(ok(getEmployeeUseCaseSpy.result))
    });

    test('should return serverError if getEmployeeUseCase throws', async () => {
      const { sut, getEmployeeUseCaseSpy } = makeSut()
      const mockedError = new Error()
      jest.spyOn(getEmployeeUseCaseSpy, 'get').mockImplementationOnce(() => {
        throw mockedError
      })
      const response = await sut.handle({})
      expect(response).toEqual(serverError(mockedError))
    });
  });
});