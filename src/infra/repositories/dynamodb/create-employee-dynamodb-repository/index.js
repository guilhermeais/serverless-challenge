class CreateEmployeeDynamoDBRepository {
  /**
   * @type import('aws-sdk').DynamoDB.DocumentClient
   */
  #dynamoDBClient = null
  constructor({ dynamoDBClient }) {
    this.tableName = 'employees'
    this.#dynamoDBClient = dynamoDBClient
  }

  async create(employee) {
    const params = {
      TableName: this.tableName,
      Item: { ...employee },
    }

    await this.#dynamoDBClient.put(params).promise()
    const employeeInserted = await this.#dynamoDBClient
      .get({
        TableName: this.tableName,
        Key: {
          id: employee.id,
        },
      })
      .promise()
    return employeeInserted.Item
  }
}

module.exports = {
  CreateEmployeeDynamoDBRepository,
}