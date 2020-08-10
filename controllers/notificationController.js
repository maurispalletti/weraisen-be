const notificationDelegate = require('../delegates/notificationDelegate')
const validators = require('../commons/validators')

const getNotificationsByUserId = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.params

  const notifications = await notificationDelegate.getNotificationsByUserId(userId)
  res.json(notifications)
}

const createNotification = async (req, res) => {
  const requiredParams = [
    'userId',
    'status',
    'type',
    'message',
  ]

  console.log(req.body)

  validators.validateRequiredKeys(req.body, requiredParams)

  const notification = await notificationDelegate.createNotification(req.body)
  res.json(notification)
}

const sendEmail = async (req, res) => {
 

  console.log(req.body)
  

  const email = await notificationDelegate.sendEmail(req.body)
  res.json(email)
}

module.exports = {
  getNotificationsByUserId,
  createNotification,
  sendEmail,
}
