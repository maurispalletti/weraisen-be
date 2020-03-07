const express = require('express')
const requestController = require('../controllers/requestController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.get('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, requestController.getRequestsByUserId)
})

router.post('/', async (req, res) => {
  routeController.handleRequest(req, res, requestController.createRequest)
})

router.put('/:requestId', async (req, res) => {
  routeController.handleRequest(req, res, requestController.updateRequest)
})

module.exports = router
