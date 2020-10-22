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

router.get('/createToken', async (req, res) => {
  routeController.handleRequest(req, res, adminController.createToken)
})

router.put('/compliant/:compliantId', async (req, res) => {
  routeController.handleRequest(req, res, adminController.updateCompliantStatus)
})

router.put('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, adminController.updateUserStatus)
})

module.exports = router
