import { adaptLambda } from '../adapters/aws/lambda-adapter.js'
import { makeGetEmpoyeeController } from '../factories/controllers/employee/get-employee-controller-factory.js'

export const getEmployeeLambda = adaptLambda(
    makeGetEmpoyeeController()
  )

