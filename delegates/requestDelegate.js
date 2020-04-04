const requestService = require('../services/requestService')
const notificationService = require('../services/notificationService')
const userService = require('../services/userService')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')

const {
  notifications: {
    status: { ACTIVE },
    type: { REQUEST },
  },
  requests: {
    status: { CREATED, CONFIRMED, CANCELED },
  }
} = constants

const getRequestsByUserId = async (userId) => {
  return requestService.getRequestsByUserId(userId)
}

const createRequest = async (requestData) => {
  const newRequest = await requestService.createRequest(requestData)
  if (newRequest) {
    const { id, userId, userRequestedId } = newRequest

    const { firstName, lastName } = await userService.findUserById(userId)

    const notificationContent = {
      userId: userRequestedId,
      status: ACTIVE,
      type: REQUEST,
      message: `El turista ${firstName} ${lastName} te envió una solicitud de encuentro.`,
      contentId: id,
    }

    notificationService.createNotification(notificationContent)

    return newRequest
  } else {
    console.log(`hubo un error creando la solicitud: ${error}`)
  }
}

const updateRequest = async (requestId, status) => {
  if (status === CONFIRMED || status === CANCELED) {
    const updatedRequest = await requestService.updateRequest(requestId, status)

    if (updatedRequest) {
      let message = ''

      if (status === CONFIRMED) {
        const { firstName, lastName } = await userService.findUserById(updatedRequest.userRequestedId)
        message = `El guía ${firstName} ${lastName} aceptó tu solicitud de encuentro.`
      }
      if (status === CANCELED) {
        const { firstName, lastName } = await userService.findUserById(updatedRequest.userRequestedId)
        message = `El encuentro con ${firstName} ${lastName} fue cancelado.`
      }

      const notificationContent = {
        userId: updatedRequest.userId,
        status: ACTIVE,
        type: REQUEST,
        message,
        contentId: updatedRequest.id,
      }
      
      notificationService.createNotification(notificationContent)

      return updatedRequest
    } else {
      console.log(`hubo un error actualizando el estado de la solicitud: ${error}`)
      throw new error.AppError(exceptions.exceptionType.request.cannotUpdateRequest, 'requestDelegate.updateRequest')
    }
  } else {
    console.log(`Status debe ser ${CREATED}, ${CONFIRMED} o ${CANCELED}`)
    throw new error.AppError(exceptions.exceptionType.request.cannotUpdateRequest, 'requestDelegate.updateRequest')
  }
}

module.exports = {
  getRequestsByUserId,
  createRequest,
  updateRequest,
}
