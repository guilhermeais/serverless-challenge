const { GetEmployee } = require('.')
const { faker } = require('@faker-js/faker')
const {
  GetEmployeeRepositorySpy,
} = require('../../../../tests/mocks/infra/repositories/get-employee-repository-spy')
describe('GetEmployee', () => {
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
    })
  })
})
