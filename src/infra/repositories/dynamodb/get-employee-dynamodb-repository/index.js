export class GetEmployeeDynamoDBRepository {
  /**
   * @type import('aws-sdk').DynamoDB.DocumentClient
   */
  #dynamoDBClient = null
  constructor({ dynamoDBClient }) {
    this.tableName = 'employees'
    this.#dynamoDBClient = dynamoDBClient
  }

  async get({ id, name, cpf } = {}) {
    const params = {
      TableName: this.tableName,
      Key: {
        ...(id ? { id } : {}),
        ...(name ? { name } : {}),
        ...(cpf ? { cpf } : {}),
      },
    }

    if(id) {
      const result = await this.#dynamoDBClient.get(params).promise()
      return result.Item || null
    }


    const result = await this.#dynamoDBClient.scan({
      ...params,
      ScanFilter:{
        ...(name ? { name: { ComparisonOperator: 'EQ', AttributeValueList: [name] } } : {}),
        ...(cpf ? { cpf: { ComparisonOperator: 'EQ', AttributeValueList: [cpf] } } : {}),
      }
    }).promise()
    return result.Items || []
  }
}
