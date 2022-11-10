export class CreateEmployeeDynamoDBRepository {
  #dynamoDBClient = null
  constructor({ dynamoDBClient }) {
    this.tableName = 'employees'
    this.#dynamoDBClient = dynamoDBClient
  }

  async create(employee) {
    try {
      const params = {
        TableName: this.tableName,
        Item: employee,
      }

      await this.#dynamoDBClient.put(params).promise()
    } catch (error) {
      console.error(error)
    }
  }
}
