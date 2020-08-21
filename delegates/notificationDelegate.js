const notificationService = require('../services/notificationService')
const matchDelegate = require('../delegates/matchDelegate')

const getNotificationsByUserId = async (userId) => {
  await matchDelegate.getEndedMatchesByUserToReview(userId);
  return notificationService.getNotificationsByUserId(userId);
}

const getUnreadNotificationsByUserId = async (userId) => {
  return notificationService.getUnreadNotificationsByUserId(userId);
}

const createNotification = async (notificationData) => {
  return notificationService.createNotification(notificationData)
}

const updateNotificationsStatus = async (userId, status) => {
  notificationService.updateNotificationsStatus(userId, status)
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
  updateNotificationsStatus,
  getUnreadNotificationsByUserId,
}
