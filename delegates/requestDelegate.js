const requestService = require('../services/requestService')
const notificationService = require('../services/notificationService')
const userService = require('../services/userService')

// const error = require('../commons/error')
const exceptions = require('../commons/exceptions')
const constants = require('../commons/constants')

const {
  notifications: { status: { ACTIVE, CLOSED },
    type: { REQUEST, MATCH, REVIEW },
  } } = constants;

const getRequestsByUserId = async (userId) => {
  return requestService.getRequestsByUserId(userId)
}

const createRequest = async (requestData) => {
  const newRequest = await requestService.createRequest(requestData)
  // CREAR NOTIFICACIONES DESPUES DE GENERAR LA REQUEST

  console.log(`requestData: ${JSON.stringify(requestData)}`)
  console.log(`newRequest: ${newRequest}`)

  if (newRequest) {
    const { id, userId, userRequestedId } = newRequest

    const { firstName, lastName } = await userService.findUserById(userId)

    const notificationContent = {
      userId: userRequestedId,
      status: ACTIVE,
      type: REQUEST,
      message: `El turista ${firstName} ${lastName} te envió una solicitud de encuentro`,
      contentId: id,
    }

    const newNotification = notificationService.createNotification(notificationContent)

    return newNotification

  } else {
    console.log(`hubo un error: ${error}`)
  }
}

const updateRequest = async (requestId, status) => {
  return requestService.updateRequest(requestId, status)
}

module.exports = {
  getRequestsByUserId,
  createRequest,
  updateRequest,
}
