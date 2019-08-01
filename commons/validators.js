const exceptions = require('./exceptions')
const error = require('./error')

// Function to validate required params
// If some param is missing, exception is thrown
const validateRequiredKeys = (obj, paramNamesList) => {
  let errorDetails = []
  paramNamesList.forEach(paramName => {
    if (!obj[paramName] && obj[paramName] !== 0) errorDetails.push({ key: 'Required field', value: paramName })
  })
  if (errorDetails.length > 0) {
    throw new error.AppError(exceptions.exceptionType.missingParameters, 'validators.validateRequiredKey', errorDetails)
  }
}

// Function to validate if param are number type
// If not, exception is thrown
const validateNumbersKeys = (obj, paramNamesList) => {
  let errorDetails = []
  paramNamesList.forEach(paramName => {
    if (obj[paramName] !== undefined && isNaN(obj[paramName])) {
      errorDetails.push({ key: `${paramName} field must be a number`, value: obj[paramName] })
    }
  })
  if (errorDetails.length > 0) {
    throw new error.AppError(exceptions.exceptionType.numbersParameters, 'validators.validateNumbersKeys', errorDetails)
  }
}

module.exports = {
  validateRequiredKeys,
  validateNumbersKeys
}
