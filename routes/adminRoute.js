const express = require('express')
const adminController = require('../controllers/adminController')
const routeController = require('../commons/routeController')

const router = express.Router()

router.get('/pending', async (req, res) => {
  routeController.handleRequest(req, res, adminController.getPendingUsersList)
})

router.get('/compliant', async (req, res) => {
  routeController.handleRequest(req, res, adminController.getCompliantsList)
})

router.put('/compliant/:userId', async (req, res) => {
  routeController.handleRequest(req, res, adminController.updateCompliantStatus)
})

router.put('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, adminController.updateUserStatus)
})

module.exports = router
