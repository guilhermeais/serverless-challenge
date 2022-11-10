import { describe, test, beforeAll, beforeEach } from '@jest/globals'
import { CreateEmployeeDynamoDBRepository } from './create-employee-dynamodb-repository'
import { mockEmployee } from '../../../../tests/mocks/domain/mock-employee'
import { DynamoDBHelpers } from './helpers/dynamodb-helpers'

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

    beforeEach(async () => {
      await dynamoDBHelpers.drop()
      await dynamoDBHelpers.migrate()
    })

    test('should create a employee', async () => {
      const { sut } = makeSut()
      const employee = mockEmployee()
      await sut.create(employee)
      const params = {
        TableName: 'employees',
        Key: {
          id: employee.id,
        },
      }

      const result = await dynamoDBClient.get(params).promise()
      expect(result.Item).toEqual(employee)
    })
  })
})
