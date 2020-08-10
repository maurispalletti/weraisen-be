const express = require('express')
const routeController = require('../commons/routeController')
const router = express.Router()
const chartController = require('../controllers/chartController')

//GRÁFICO CANTIDAD POR MESES 
router.get('/matchesPerMonth', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getMatchesPerMonth)
})

//GRAFICO USUARIOS CREDOS POR MES
router.get('/usersCreatedPerMonth/:añoUsuariosCreados', async (req, res) => {
  console.log('enrto')
  routeController.handleRequest(req, res, chartController.getUsersCreatedPerMonth)
})

//GRAFICO USUARIOS DENUNCIADOS POR TIPO
router.get('/usersReportedPerReason', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getUsersReportedPerReason)
})


//GRAFICO CIUDADES MAS ELEGIDAS POR MESS
router.get('/citiesPerMonth', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getCitiesPerMonth)
})


//GRÁFICO CATEOGRÍA POR SEXO Y EDAD 

//router.get('/category', async (req, res) => {
//   routeController.handleRequest(req, res, chartController.getChartCategory)
// })



module.exports = router
