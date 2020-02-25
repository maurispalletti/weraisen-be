const notificationService = require('../services/notificationService')

const getNotificationsByUserId = async (userId) => {
  return notificationService.getNotificationsByUserId(userId)
}

const createNotification = async (notificationData) => {

  // add notification content here!!!

  return notificationService.createNotification(notificationData)
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
}
