function adaptLambda(controller) {
  return async (event, context) => {
    const httpRequest = {
      ...(event.body? JSON.parse(event.body) : {}),
      ...(event.pathParameters || {}),
      ...(event.queryStringParameters || {}),
      ...(event.headers || {}),
    }
    const httpResponse = await controller.handle(httpRequest)
    return {
      statusCode: httpResponse.statusCode,
      body: JSON.stringify(httpResponse.body),
    }
  }
}

module.exports = { adaptLambda }