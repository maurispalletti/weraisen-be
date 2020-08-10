const express = require('express')
const notificationController = require('../controllers/notificationController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.get('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.getNotificationsByUserId)
})

router.post('/', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.createNotification)
})

router.post('/sendEmail', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.sendEmail)
})

module.exports = router
