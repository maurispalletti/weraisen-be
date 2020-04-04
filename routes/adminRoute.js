const express = require('express')
const adminController = require('../controllers/adminController')
const routeController = require('../commons/routeController')

const router = express.Router()

router.get('/pending', async (req, res) => {
  routeController.handleRequest(req, res, adminController.getPendingUsersList)
})

router.put('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, adminController.updateUserStatus)
})

module.exports = router
