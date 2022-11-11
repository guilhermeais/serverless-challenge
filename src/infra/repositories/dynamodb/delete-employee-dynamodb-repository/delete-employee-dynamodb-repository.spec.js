const  { describe, test, beforeAll, beforeEach, afterAll }  = require('@jest/globals')
const  { DeleteEmployeeDynamoDBRepository }  = require('.')
const  { mockEmployee }  = require('../../../../../tests/mocks/domain/mock-employee')
const  { DynamoDBHelpers }  = require('../helpers/dynamodb-helpers')

describe('DeleteEmployeeDynamoDBRepository', () => {
  const dynamoDBHelpers = new DynamoDBHelpers()
  const dynamoDBClient = dynamoDBHelpers.getDocumentClient()
  function makeSut() {
    const sut = new DeleteEmployeeDynamoDBRepository({
      dynamoDBClient
    })

    return { sut }
  }
  describe('delete()', () => {
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

   test('should delete a employee', async () => {
      const { sut } = makeSut()
      const employeeCreated = mockEmployee()
      await dynamoDBClient.put({
        TableName: 'employees',
        Item: employeeCreated
      }).promise()
      const result = await sut.delete({id: employeeCreated.id})
      const employee = await dynamoDBClient.get({
        TableName: 'employees',
        Key: {
          id: employeeCreated.id
        }
      }).promise()
      expect(employee.Item).toBeUndefined()
      expect(result).toBe(true)
   });

   test('should return false if employee does not exits', async () => {
      const { sut } = makeSut()
      const employeeCreated = mockEmployee()
      const employeeDeleted = await sut.delete({id: employeeCreated.id})
      expect(employeeDeleted).toBe(false)
   });
  })
})
