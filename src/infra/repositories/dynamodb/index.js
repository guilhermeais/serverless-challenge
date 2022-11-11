const {
  CreateEmployeeDynamoDBRepository,
} = require('./create-employee-dynamodb-repository')
const {
  UpdateEmployeeDynamoDBRepository,
} = require('./update-employee-dynamodb-repository')
const {
  GetEmployeeDynamoDBRepository,
} = require('./get-employee-dynamodb-repository')
const {
  DeleteEmployeeDynamoDBRepository,
} = require('./delete-employee-dynamodb-repository')

module.exports = {
  CreateEmployeeDynamoDBRepository,
  UpdateEmployeeDynamoDBRepository,
  GetEmployeeDynamoDBRepository,
  DeleteEmployeeDynamoDBRepository,
}
