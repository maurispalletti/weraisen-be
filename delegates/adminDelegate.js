const userService = require('../services/userService')
const compliantService = require('../services/compliantService')
const constants = require('../commons/constants')
const notificationService = require('../services/notificationService')

const {
  users: {
    status: { PENDING },
  },
  compliants: {
    status: { CREATED, BLOCKED }
  },
  notifications: {
    status: { ACTIVE },
    type: { ADVICE },
  }
} = constants

const getPendingUsersList = async () => {
  return userService.findUsersByStatus(PENDING)
}

const getCompliantsList = async () => {
  return compliantService.getCompliantsList(CREATED)
}

const updateUserStatus = async (userId, status) => {
  const updatedUser = await userService.updateUserStatus(userId, status)
  return updatedUser
}

const updateCompliantStatus = async (compliantId, status) => {
  const updatedCompliant = await compliantService.updateCompliant(compliantId, status)

  if (status === BLOCKED) {
    await userService.updateUserStatus(updatedCompliant.accusedId, constants.users.status.BLOCKED)
    const compliantNotificationContent = {
      userId: updatedCompliant.accusedId,
      status: ACTIVE,
      type: ADVICE,
      message: `Fuiste bloqueado por no cumplir con las políticas de uso aceptadas por WeRaisen.`,
      contentId: updatedCompliant.id,
    }
    notificationService.createNotification(compliantNotificationContent)
  }

  return updatedCompliant
}

module.exports = {
  getPendingUsersList,
  updateUserStatus,
  updateCompliantStatus,
  getCompliantsList,
}
