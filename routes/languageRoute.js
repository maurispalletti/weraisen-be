const express = require('express')
const languageController = require('../controllers/languageController')
const routeController = require('../commons/routeController')

const router = express.Router()

router.get('/', async (req, res) => {
    routeController.handleRequest(req, res, languageController.getLanguages)
  })

 router.post('/', async (req, res) => {
 routeController.handleRequest(req, res, languageController.postLanguage)
})

module.exports = router