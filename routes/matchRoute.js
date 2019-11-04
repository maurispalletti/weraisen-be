const express = require('express')
const matchController = require('../controllers/matchController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.post('/', async (req, res) => {
  routeController.handleRequest(req, res, matchController.createMatch)
})

router.post('/getMatchByUserIds', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getMatchByUserIds)
})

router.get('/:id', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getMatch)
})

router.get('/user/:userId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getMatchesByUser)
})

router.get('/chat/:chatId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getMatcByChatId)
})

router.put('/chat/:chatId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.updateMatch)
})

module.exports = router
