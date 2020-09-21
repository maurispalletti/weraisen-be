const touristService = require('../services/touristService')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')

const updateTourist = async (userId, tourist) => {
	const updatedTourist = touristService.updateTourist(userId, tourist)

	validateTouristExists(userId, updatedTourist)

	return updatedTourist
}

const updateGuiaActivo = async (userId, tourist) => {
	const updatedTourist = touristService.updateGuiaActivo(userId, tourist)

	validateTouristExists(userId, updatedTourist)

	return updateGuiaActivo
}

const validateTouristExists = (id, tourist) => {
  if (!tourist) {
    throw new error.AppError(
      exceptions.exceptionType.tourist.touristNotFound,
      'touristDelegate.validateTouristExists',
      { key: 'userId', value: id }
    )
  }
} 

module.exports = {
  updateTourist,
  updateGuiaActivo
}
