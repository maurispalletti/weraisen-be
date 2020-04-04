const notificationService = require('../services/notificationService')
const matchDelegate = require('../delegates/matchDelegate')

const getNotificationsByUserId = async (userId) => {
  await matchDelegate.getEndedMatchesByUserToReview(userId);
  return notificationService.getNotificationsByUserId(userId);
}

const createNotification = async (notificationData) => {
  return notificationService.createNotification(notificationData)
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
}
