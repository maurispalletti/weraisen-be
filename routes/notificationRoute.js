const express = require('express')
const notificationController = require('../controllers/notificationController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.get('/', async (req, res) => {
  routeController.handleRequest(req, res, notificationController.getNotificationsByUserId)
})

module.exports = router
