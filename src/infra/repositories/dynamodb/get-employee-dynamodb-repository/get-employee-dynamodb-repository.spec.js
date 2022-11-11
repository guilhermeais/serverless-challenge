const  { faker }  = require('@faker-js/faker')
const  { describe, test, beforeAll, beforeEach, afterAll,expect }  = require('@jest/globals')
const  { GetEmployeeDynamoDBRepository }  = require('.')
const  { mockEmployee }  = require('../../../../../tests/mocks/domain/mock-employee')
const  { DynamoDBHelpers }  = require('../helpers/dynamodb-helpers')

describe('GetEmployeeDynamoDBRepository', () => {
  const dynamoDBHelpers = new DynamoDBHelpers()
  const dynamoDBClient = dynamoDBHelpers.getDocumentClient()
  function makeSut() {
    const sut = new GetEmployeeDynamoDBRepository({
      dynamoDBClient,
    })

    return { sut }
  }
  describe('get()', () => {
    beforeAll(async () => {
      await dynamoDBHelpers.drop()
      await dynamoDBHelpers.migrate()
    })

    afterAll(async () => {
      await dynamoDBHelpers.drop()
    })

    beforeEach(async () => {
      await dynamoDBHelpers.drop()
      await dynamoDBHelpers.migrate()
    })
    
    test('should return null if any employee was found', async () => {
      const { sut } = makeSut()
      const result = await sut.get({ id: faker.datatype.uuid() })
      expect(result).toBeNull()
    })

    test('should return a valid employee if an employee with the provided id was found', async () => {
      const { sut } = makeSut()
      const employee = mockEmployee()
      const employeeTwo = mockEmployee()

      const paramsTwo = {
        TableName: 'employees',
        Item: employeeTwo,
      }
      await dynamoDBClient.put(paramsTwo).promise()
      const params = {
        TableName: 'employees',
        Item: employee,
      }
      await dynamoDBClient.put(params).promise()
      const result = await sut.get({ id: employee.id })
      expect(result).toEqual(employee)
    });

    test('should return a valid employee if an employee with the cpf was found', async () => {
      const { sut } = makeSut()
      const employee = mockEmployee()
      const employeeTwo = mockEmployee()

      const paramsTwo = {
        TableName: 'employees',
        Item: employeeTwo,
      }
      await dynamoDBClient.put(paramsTwo).promise()
      const params = {
        TableName: 'employees',
        Item: employee,
      }
      await dynamoDBClient.put(params).promise()
      const result = await sut.get({ cpf: employee.cpf })
      expect(result).toEqual([employee])
    });

    test('should return an array of employees if many employees was found', async () => {
      const { sut } = makeSut()
      const employee = mockEmployee()
      const employeeTwo = mockEmployee()
      const params = {
        TableName: 'employees',
        Item: employee,
      }
      await dynamoDBClient.put(params).promise()

      const paramsTwo = {
        TableName: 'employees',
        Item: employeeTwo,
      }
      await dynamoDBClient.put(paramsTwo).promise()
      const result = await sut.get()
      expect(result).toEqual(expect.arrayContaining([employee, employeeTwo]))
    });

  })
})
