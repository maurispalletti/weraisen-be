const requestService = require('../services/requestService')
const notificationService = require('../services/notificationService')
// const error = require('../commons/error')
const exceptions = require('../commons/exceptions')

const getRequestsByUserId = async (userId) => {
  return requestService.getRequestsByUserId(userId)
}

const createRequest = async (requestData) => {
    const newRequest = await requestService.createRequest(requestData)
    // CREAR NOTIFICACIONES DESPUES DE GENERAR LA REQUEST

    console.log(`requestData: ${JSON.stringify(requestData)}`)
    console.log(`newRequest: ${newRequest}`)

    if (newRequest) {
      return newRequest
    } else {
      console.log(`hubo un error: ${error}`)
    }

    // notificationService.createNotification()


}

const updateRequest = async (requestId, status) => {
  return requestService.updateRequest(requestId, status)
}

module.exports = {
  getRequestsByUserId,
  createRequest,
  updateRequest,
}
