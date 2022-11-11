const {
  GetEmployeeController,
} = require('../../../../presentation/controllers/employees-controller/index.js')
const {
  GetEmployee,
} = require('../../../../domain/usecases/get-employee/index.js')
const {
  GetEmployeeDynamoDBRepository,
} = require('../../../../infra/repositories/dynamodb/index.js')
const {
  DynamoDBHelpers,
} = require('../../../../infra/repositories/dynamodb/helpers/dynamodb-helpers.js')
const {
  ValidationComposite,
} = require('../../../../validator/validation-composite.js')
function makeGetEmpoyeeController() {
  const getEmployeeUseCase = new GetEmployee({
    getEmployeeRepository: new GetEmployeeDynamoDBRepository({
      dynamoDBClient: new DynamoDBHelpers().getDocumentClient(),
    }),
  })

  const validator = new ValidationComposite()

  return new GetEmployeeController({
    getEmployeeUseCase,
    validator,
  })
}

module.exports = {
  makeGetEmpoyeeController,
}
