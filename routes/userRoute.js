const express = require('express')
const userController = require('../controllers/userController')
const routeController = require('../commons/routeController')

const router = express.Router()

/* POST user signup. */
router.post('/signup', async (req, res) => {
  routeController.handleRequest(req, res, userController.signup)
})

/* POST user login. */
router.post('/login', async (req, res) => {
  routeController.handleRequest(req, res, userController.login)
})

/* TEST. */
router.get('/test', async (req, res) => {
  routeController.handleRequest(req, res, userController.test)
})

module.exports = router
