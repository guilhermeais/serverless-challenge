export function badRequest (error) {
  return {
    statusCode: 400,
    body: error
  }
}

export function serverError (error) {
  return {
    statusCode: 500,
    body: error.stack
  }
}

export function ok (data) {
  return {
    statusCode: 200,
    body: data
  }
}