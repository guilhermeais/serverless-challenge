import { describe, test, beforeAll, beforeEach, afterAll } from '@jest/globals'
import { CreateEmployeeDynamoDBRepository } from '.'
import { mockEmployee } from '../../../../../tests/mocks/domain/mock-employee'
import { DynamoDBHelpers } from '../helpers/dynamodb-helpers'

describe('CreateEmployeeDynamoDBRepository', () => {
  const dynamoDBHelpers = new DynamoDBHelpers()
  const dynamoDBClient = dynamoDBHelpers.getDocumentClient()
  function makeSut() {
    const sut = new CreateEmployeeDynamoDBRepository({
      dynamoDBClient
    })

    return { sut }
  }
  describe('create()', () => {
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

    test('should create a employee', async () => {
      const { sut } = makeSut()
      const employee = mockEmployee()
      const params = {
        TableName: 'employees',
        Key: {
          id: employee.id,
        },
      }
      const resultBeforeInsert = await dynamoDBClient.get(params).promise()
      expect(resultBeforeInsert.Item).toBeUndefined()
      await sut.create(employee)

      const result = await dynamoDBClient.get(params).promise()
      expect(result.Item).toEqual(employee)
    })

    test('should return a employee on success', async () => {
      const { sut } = makeSut()
      const employee = mockEmployee()
      const result = await sut.create(employee)
      expect(result).toEqual(employee)
    });
  })
})
