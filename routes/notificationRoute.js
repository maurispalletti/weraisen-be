const express = require('express')
const notificationController = require('../controllers/notificationController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.get('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.getNotificationsByUserId)
})

router.put('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.updateNotificationsStatus)
})

router.get('/unread/:userId', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.getUnreadNotificationsByUserId)
})

router.post('/', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.createNotification)
})

router.post('/sendEmailUsuarioAprobado', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.sendEmailUsuarioAprobado)
})
router.post('/sendEmailUsuarioDenegado', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.sendEmailUsuarioDenegado)
})
router.post('/sendEmailRestablecerPass', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.sendEmailRestablecerPass)
})
router.post('/sendEmailCuentaBloqueada', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.sendEmailCuentaBloqueada)
})

router.post('/sendEmailEncuentro', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.sendEmailEncuentro)
})

module.exports = router
