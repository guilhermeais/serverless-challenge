import { jest, describe, test } from '@jest/globals'
import { GetEmployee } from '.'
import { faker } from '@faker-js/faker'
describe('GetEmployee', () => {
  class GetEmployeeRepositorySpy {
    params = null
    result = {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      role: faker.name.jobTitle(),
      salary: faker.datatype.number(),
      age: faker.datatype.number(),
    }
    async get(...params) {
      this.params = params
      return this.result
    }
  }

  function makeSut() {
    const getEmployeeRepositorySpy = new GetEmployeeRepositorySpy()
    const sut = new GetEmployee({
      getEmployeeRepository: getEmployeeRepositorySpy,
    })

    return {
      getEmployeeRepositorySpy,
      sut,
    }
  }
  describe('execute()', () => {
    test('should call getEmployeeRepository with correct params', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const params = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
      }
      await sut.execute(params)
      expect(getEmployeeRepositorySpy.params).toEqual([params])
    })
    test('should return the getEmployeeRepository result', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const params = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
      }
      const employee = await sut.execute(params)
      expect(employee).toEqual(getEmployeeRepositorySpy.result)
    })

    test('should throw if getEmployeeRepository throws', async () => {
      const { sut, getEmployeeRepositorySpy } = makeSut()
      const mockedError = new Error('some_error')
      jest.spyOn(getEmployeeRepositorySpy, 'get').mockImplementationOnce(() => {
        return Promise.reject(mockedError)
      })
      const params = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
      }
      const promise = sut.execute(params)
      await expect(promise).rejects.toThrow(mockedError)
    });
  })
})
