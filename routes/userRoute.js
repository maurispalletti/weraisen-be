const express = require('express')
const multer = require('multer')
const userController = require('../controllers/userController')
const routeController = require('../commons/routeController')
const router = express.Router()

const upload = multer({ dest: '/tmp' })

router.post('/signup', async (req, res) => {
  routeController.handleRequest(req, res, userController.signup)
})

router.post('/login', async (req, res) => {
  routeController.handleRequest(req, res, userController.login)
})

router.post('/identification', upload.single('file'), async (req, res) => {
  routeController.handleRequest(req, res, userController.uploadIdentification)
})

router.get('/:id', async (req, res) => {
  routeController.handleRequest(req, res, userController.findUserById)
})

router.post('/uploadIdImage', async (req, res) => {
  routeController.handleRequest(req, res, userController.uploadIdImage)
})

router.post('/compliant', async (req, res) => {
  routeController.handleRequest(req, res, userController.createCompliant)
})

module.exports = router
