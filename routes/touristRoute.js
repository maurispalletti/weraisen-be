const express = require('express')
const touristController = require('../controllers/touristController')
const routeController = require('../commons/routeController')
const router = express.Router()

router.put('/:userId', async (req, res) => {
  routeController.handleRequest(req, res, touristController.updateTourist)
})

router.put('/updateGuiaActivo/:userId', async (req, res) => {
  routeController.handleRequest(req, res, touristController.updateGuiaActivo)
})


module.exports = router
