const express = require('express')
const userController = require('../controllers/userController')
const routeController = require('../commons/routeController')

const router = express.Router()

// POST user signup

// agregar datos de turista a esta creacion de usuario (va a ser el user por defecto)
// quiza cambiar el nombre por crear turista

router.post('/signup', async (req, res) => {
  routeController.handleRequest(req, res, userController.signup)
})

router.post('/login', async (req, res) => {
  routeController.handleRequest(req, res, userController.login)
})

router.get('/:id', async (req, res) => {
  routeController.handleRequest(req, res, userController.findUserById)
})

module.exports = router
