export class DeleteEmployeeDynamoDBRepository {
  /**
   * @type import('aws-sdk').DynamoDB.DocumentClient
   */
  #dynamoDBClient = null
  constructor({ dynamoDBClient }) {
    this.tableName = 'employees'
    this.#dynamoDBClient = dynamoDBClient
  }

  async delete(id) {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
      ReturnValues: 'ALL_OLD',
    }
    const { Attributes: result} = await this.#dynamoDBClient.delete(params).promise()
    return !!result?.id
  }
}
