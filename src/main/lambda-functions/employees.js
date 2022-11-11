const  { adaptLambda }  = require('../adapters/aws/lambda-adapter.js')
const  { makeGetEmpoyeeController }  = require('../factories/controllers/employee/get-employee-controller-factory.js')

module.exports.getEmployeeLambda = adaptLambda(
    makeGetEmpoyeeController()
  )

