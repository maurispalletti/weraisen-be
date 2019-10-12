const express = require('express')
const chatController = require('../controllers/chatController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.post('/', async (req, res) => {
  routeController.handleRequest(req, res, chatController.createChat)
})

router.put('/:id', async (req, res) => {
  routeController.handleRequest(req, res, chatController.addMessage)
})

router.get('/:id', async (req, res) => {
  routeController.handleRequest(req, res, chatController.getChat)
})

module.exports = router
