const notificationDelegate = require('../delegates/notificationDelegate')
const validators = require('../commons/validators')

const getNotificationsByUserId = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.params

  const notifications = await notificationDelegate.getNotificationsByUserId(userId)
  res.json(notifications)
}

const getUnreadNotificationsByUserId = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.params

  const notifications = await notificationDelegate.getUnreadNotificationsByUserId(userId)
  res.json(notifications)
}

const updateNotificationsStatus = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])
  validators.validateRequiredKeys(req.body, ['status'])

  const { userId } = req.params
  const { status } = req.body

  const notifications = await notificationDelegate.updateNotificationsStatus(userId, status)
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

const sendEmailRestablecerPass = async (req, res) => { 

  console.log(req.body)  

  const email = await notificationDelegate.sendEmailRestablecerPass(req.body)
  res.json(email)
}

const sendEmailUsuarioDenegado = async (req, res) => { 

  console.log(req.body)  

  const email = await notificationDelegate.sendEmailUsuarioDenegado(req.body)
  res.json(email)
}

const sendEmailUsuarioAprobado = async (req, res) => { 

  console.log(req.body)  

  const email = await notificationDelegate.sendEmailUsuarioAprobado(req.body)
  res.json(email)
}

const sendEmailCuentaBloqueada = async (req, res) => { 

  console.log(req.body)  

  const email = await notificationDelegate.sendEmailCuentaBloqueada(req.body)
  res.json(email)
}

const sendEmailEncuentro = async (req, res) => { 

   

  const email = await notificationDelegate.sendEmailEncuentro(req.body)
  res.json(email)
}

module.exports = {
  getNotificationsByUserId,
  getUnreadNotificationsByUserId,
  createNotification,
  sendEmailRestablecerPass,
  sendEmailUsuarioDenegado,
  sendEmailUsuarioAprobado,
  sendEmailCuentaBloqueada,
  sendEmailEncuentro,
  updateNotificationsStatus,
}
