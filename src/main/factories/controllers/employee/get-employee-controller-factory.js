import { GetEmployeeController } from '../../../../presentation/controllers/employees-controller/index.js';
import { GetEmployee } from '../../../../domain/usecases/get-employee/index.js'
import { GetEmployeeDynamoDBRepository } from '../../../../infra/repositories/dynamodb/index.js'
import { DynamoDBHelpers } from '../../../../infra/repositories/dynamodb/helpers/dynamodb-helpers.js';
import  { ValidationComposite } from '../../../../validator/validation-composite.js'
export function makeGetEmpoyeeController() {
  const getEmployeeUseCase = new GetEmployee({
    getEmployeeRepository: new GetEmployeeDynamoDBRepository({
      dynamoDBClient: new DynamoDBHelpers().getDocumentClient()
    })
  });

  const validator = new ValidationComposite()
  
  return new GetEmployeeController({
    getEmployeeUseCase,
    validator
  })
}