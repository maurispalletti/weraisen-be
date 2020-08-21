const NotificationModel = require('../models/NotificationModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')

const { notifications: { status: { ACTIVE, READ } } } = constants;

const getNotificationsByUserId = async (userId) => {
  const notifications = await NotificationModel.find({ userId, $or: [{ status: ACTIVE }, { status: READ }] }).sort({ createdAt: -1 })

  if (notifications && notifications.length) {
    return notifications
  }
  return null
}

const getUnreadNotificationsByUserId = async (userId) => {
  const notifications = await NotificationModel.find({ userId, status: ACTIVE }).sort({ createdAt: -1 })

  if (notifications && notifications.length) {
    return notifications
  }
  return null
}

const createNotification = async (notificationData) => {
  const newNotification = new NotificationModel(notificationData)
  const savedNotification = await newNotification.save({ new: true })
  if (savedNotification) {
    return savedNotification
  }
  throw new error.AppError(exceptions.exceptionType.notification.cannotCreateNotification, 'notificationService.createNotification')
}


const updateNotificationsStatus = async (userId, status) => {
  return NotificationModel.updateMany({ userId }, { $set: { status } });
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
  updateNotificationsStatus,
  getUnreadNotificationsByUserId,
}
