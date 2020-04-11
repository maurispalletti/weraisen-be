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

const updateCompliantStatus = async (userId, status) => {
  const updatedCompliant = await compliantService.updateCompliant(userId, status)

  if (status === BLOCKED) {
    await userService.updateUserStatus(userId, BLOCKED)
    const compliantNotificationContent = {
			userId,
			status: ACTIVE,
			type: COMPLIANT,
			message: `Fuiste bloqueado por no cumplir con las políticas de uso aceptadas por WeRaisen.`,
			contentId: userId,
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
