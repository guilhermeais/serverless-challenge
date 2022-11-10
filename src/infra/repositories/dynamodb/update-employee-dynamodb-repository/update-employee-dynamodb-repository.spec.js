import { describe, test, beforeAll, beforeEach, afterAll } from '@jest/globals'
import { UpdateEmployeeDynamoDBRepository } from '.'
import { mockEmployee } from '../../../../../tests/mocks/domain/mock-employee'
import { DynamoDBHelpers } from '../helpers/dynamodb-helpers'

describe('UpdateEmployeeDynamoDBRepository', () => {
  const dynamoDBHelpers = new DynamoDBHelpers()
  const dynamoDBClient = dynamoDBHelpers.getDocumentClient()
  function makeSut() {
    const sut = new UpdateEmployeeDynamoDBRepository({
      dynamoDBClient
    })

    return { sut }
  }
  describe('update()', () => {
    beforeAll(async () => {
      await dynamoDBHelpers.migrate()
    })

    afterAll(async () => {
      await dynamoDBHelpers.drop()
    })

    beforeEach(async () => {
      await dynamoDBHelpers.drop()
      await dynamoDBHelpers.migrate()
    })

    test('should update a', async () => {
      const { sut } = makeSut()
      const employeeCreated = mockEmployee()
      await dynamoDBClient.put({
        TableName: 'employees',
        Item: employeeCreated
      }).promise()
      const employeeUpdated = mockEmployee()
       await sut.update(employeeCreated.id, employeeUpdated)
      const employee = await dynamoDBClient.get({
        TableName: 'employees',
        Key: {
          id: employeeCreated.id
        }
      }).promise()
      expect(employee.Item).toEqual({
        ...employeeCreated,
        ...employeeUpdated
      })
    });

    test('should return a employee updated', async () => {
      const { sut } = makeSut()
      const employeeCreated = mockEmployee()
      await dynamoDBClient.put({
        TableName: 'employees',
        Item: employeeCreated
      }).promise()
      const employeeUpdated = mockEmployee()
      const employeeUpdatedResult = await sut.update(employeeCreated.id, employeeUpdated)
      expect(employeeUpdatedResult).toEqual({
        ...employeeUpdated,
        id: employeeCreated.id,
        createdAt: employeeCreated.createdAt,
        updatedAt: employeeUpdatedResult.updatedAt
      })
    });
  })
})
