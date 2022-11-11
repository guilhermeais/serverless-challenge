import { DynamoDBHelpers } from '../helpers/dynamodb-helpers.js'

export class UpdateEmployeeDynamoDBRepository {
  /**
   * @type import('aws-sdk').DynamoDB.DocumentClient
   */
  #dynamoDBClient = null
  #dynamoDBHelpers = new DynamoDBHelpers()
  constructor({ dynamoDBClient }) {
    this.tableName = 'employees'
    this.#dynamoDBClient = dynamoDBClient
  }

  async update(id, employee) {
    delete employee.id
    delete employee.createdAt
    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } = this.#dynamoDBHelpers.mountUpdateExpressions(employee)
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }
    const result = await this.#dynamoDBClient.update(params).promise()
    return result.Attributes
  }
}
