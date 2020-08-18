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

router.put('/:matchId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.updateMatchStatus)
})

router.put('/updateDate/:matchId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.updateMatchDate)
})

router.get('/users/:userId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getMatchesByUser)
})

router.get('/reviews/:userId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getEndedMatchesByUserToReview)
})

router.get('/chats/:chatId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getMatchByChatId)
})

router.put('/chats/:chatId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.updateMatch)
})

module.exports = router
