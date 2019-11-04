const express = require('express')
const matchController = require('../controllers/reviewController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.post('/', async (req, res) => {
  routeController.handleRequest(req, res, matchController.postReview)
})

router.get('/user/:userId', async (req, res) => {
  routeController.handleRequest(req, res, matchController.getReviewsByUser)
})

module.exports = router
