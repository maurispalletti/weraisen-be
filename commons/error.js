const exceptions = require('../commons/exceptions')

// It is used to throw custom errors in app
class AppError extends Error {
  constructor (exceptionType, description, errorDetails) {
    super()
    Error.captureStackTrace(this, this.constructor)
    // Application error attributes
    this.appCode = exceptionType.code
    this.message = exceptionType.message
    this.httpStatus = exceptionType.httpStatus
    if (description) this.description = description
    if (errorDetails) this.errorDetails = errorDetails
  }
}

// Error handler used in route controller to catch and throw not handled exception in the app
const errorHandler = (res, ex) => {
  // If it is an AppError, means that was already considered and re-thrown by the app
  if (!(ex instanceof AppError)) {
    // If not, checks if it is a Not Found error or another type. New custom error is created and thrown
    if (ex.statusCode === 404) {
      ex = new AppError(exceptions.exceptionType.notFound)
    } else {
      ex = new AppError(exceptions.exceptionType.unhandledException, ex.message)
    }
  }
  const status = ex.httpStatus
  delete ex.httpStatus
  res.status(status).json(ex)
}

module.exports = {
  AppError,
  errorHandler
}
