const express = require('express')
const guideController = require('../controllers/guideController')
const routeController = require('../commons/routeController')

const router = express.Router()

// POST create guide
router.post('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, userController.signup)
})

// GET find guides !!!!!!!!!
router.get('/', async (req, res) => {
  routeController.handleRequest(req, res, userController.signup)
})

module.exports = router
