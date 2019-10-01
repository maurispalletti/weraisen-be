const express = require('express')
const guideController = require('../controllers/guideController')
const routeController = require('../commons/routeController')

const router = express.Router()

router.put('/toggle-active/:userId', async (req, res) => {
  routeController.handleRequest(req, res, guideController.toggleActive)
})

router.put('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, guideController.registerGuide)
})

router.post('/', async (req, res) => {
  routeController.handleRequest(req, res, guideController.getGuides)
})

module.exports = router
